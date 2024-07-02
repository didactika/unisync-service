import { VersionInfo } from "../../../../types/version-info";
import ComponentLoader from "../component-loader";
import DB from "../../../db";
import { ComponentManager } from "./component-manager";
import { InstalledComponent } from "../entities/installed-component";
import { PluginInfo, VerifyPluginsOptions } from "../../types/classes/manager/install-component-manager-types";
import { EComponentNature } from "../../enums/component-nature-enum";

class InstallComponentManager extends ComponentManager {
  private static instance: InstallComponentManager;

  private constructor() {
    super();
  }

  public static getInstance(): InstallComponentManager {
    if (!InstallComponentManager.instance) {
      InstallComponentManager.instance = new InstallComponentManager();
    }
    return InstallComponentManager.instance;
  }

  protected async registryComponent(dir: string, versionInfo: { default: VersionInfo }): Promise<void> {
    console.log(`Registering component: ${versionInfo.default.component}`);
    const component = new InstalledComponent({
      name: versionInfo.default.component,
      version: versionInfo.default.version,
      versionFilePath: `${ComponentLoader.getComponentPath(dir)}/version.ts`,
    });
    await component.create();
  }

  protected async isComponentInstalled(versionInfo: { default: VersionInfo }): Promise<boolean> {
    const installedModule = await InstalledComponent.findOne({
      name: versionInfo.default.component,
    });
    return installedModule !== null;
  }

  private async executeInstallFile(component: string): Promise<void> {
    await ComponentLoader.loadComponents({
      componentsToSearch: [component],
      specificFile: "install.ts",
      directory: "db",
      method: "execute",
    });
  }

  private async installComponent(component: string, dir: string): Promise<void> {
    const versionInfo = await this.getVersionInfo(dir);
    if (!versionInfo) return;

    const isInstalled = await this.isComponentInstalled(versionInfo);
    if (!isInstalled) {
      try {
        await DB.getInstance().initializeModel(component);
        await this.executeInstallFile(component);
        await this.registryComponent(dir, versionInfo);
      } catch (error) {
        console.error(`Error installing component: ${component}`, error);
      }
    }
  }

  public async verifyPluginsForInstall(options?: VerifyPluginsOptions): Promise<PluginInfo[]> {
    const pluginsToInstall: PluginInfo[] = [];

    for (const plugin of Object.entries(this._components)) {
      for (const dir of Object.entries(this._components[plugin[0]])) {
        // Check options for system or subsystem inclusion
        if (!options?.includeSystem && plugin.includes(EComponentNature.SYSTEM)) {
          console.log(`Skipping non-system component: ${dir[0]}`);
          continue;
        }

        if (!options?.includeSubsystem && plugin.includes(EComponentNature.SUBSYSTEM)) {
          console.log(`Skipping non-subsystem component: ${dir[0]}`);
          continue;
        }

        const versionInfo = await this.getVersionInfo(dir[1]);
        const isInstalled = versionInfo ? await this.isComponentInstalled(versionInfo) : false;

        if (!isInstalled) {
          pluginsToInstall.push({
            component: dir[0],
            dir: dir[1],
          });
        }
      }
    }
    return pluginsToInstall;
  }

  public async installComponents(plugins: PluginInfo[]): Promise<void> {
    for (const plugin of plugins) {
      const { component, dir } = plugin;
      await this.installComponent(component, dir);
    }
  }
}

export default InstallComponentManager;
