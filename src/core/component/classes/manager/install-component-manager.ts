import { VersionInfo } from "../../../../types/version-info";
import ComponentLoader from "../component-loader";
import DB from "../../../db";
import { ComponentManager } from "./component-manager";
import InstalledComponent from "../entities/installed-component";
import { ComponentInfo, VerifyPluginsOptions } from "../../types/classes/manager/install-component-manager-types";
import { EComponentNature } from "../../enums/component-nature-enum";
import path from "path";
import { ELoadPath } from "../../enums/load-path-enum";

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

  public static async firstInitialize(): Promise<boolean> {
    if (!InstallComponentManager.instance) {
      InstallComponentManager.instance = this.getInstance();
      await InstallComponentManager.instance.initializeModels();
      await InstallComponentManager.instance.installBasicSystemComponents();
      const { pluginsToInstall, pluginsalreadyInstalled } =
        await InstallComponentManager.instance.verifyPluginsForInstall({
          includeSubsystem: true,
          includeSystem: true,
        });
      await InstallComponentManager.instance.installComponents(pluginsToInstall);
      await InstallComponentManager.initializeExistingComponentsModels(pluginsalreadyInstalled);
      return true;
    }
    return false;
  }

  private async initializeModels() {
    await ComponentLoader.loadComponents({
      directoryPath: ELoadPath.CORE,
      componentDirectories: ["component"],
      directory: "db/models",
      method: "initialize",
    });
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
        await DB.initializeModel(component);
        await this.executeInstallFile(component);
        await this.registryComponent(dir, versionInfo);
      } catch (error) {
        console.error(`Error installing component: ${component}`, error);
      }
    }
  }

  public async installBasicSystemComponents() {
    const dir = path.join(__dirname, "../../../..");
    const versionInfo = await this.getVersionInfo("..");
    if (!versionInfo) return;

    await DB.getInstance().initializeBaseSystemModels();

    const isInstalled = await this.isComponentInstalled(versionInfo);
    if (!isInstalled) {
      try {
        await ComponentLoader.loadComponents({
          directoryPath: ELoadPath.CORE,
          componentDirectories: ["db"],
          directory: "",
          specificFile: "install.ts",
          method: "execute",
        });
        await this.registryComponent(dir, versionInfo);
      } catch (error) {
        console.error(`Error installing component: system`, error);
      }
    }
  }

  public async verifyPluginsForInstall(options?: VerifyPluginsOptions): Promise<{
    pluginsToInstall: ComponentInfo[];
    pluginsalreadyInstalled: ComponentInfo[];
  }> {
    const pluginsToInstall: ComponentInfo[] = [];
    const pluginsalreadyInstalled: ComponentInfo[] = [];

    for (const plugin of Object.entries(this._components)) {
      for (const dir of Object.entries(this._components[plugin[0]])) {
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
        } else {
          pluginsalreadyInstalled.push({
            component: dir[0],
            dir: dir[1],
          });
        }
      }
    }
    return { pluginsToInstall, pluginsalreadyInstalled };
  }

  public async installComponents(plugins: ComponentInfo[]): Promise<void> {
    for (const plugin of plugins) {
      const { component, dir } = plugin;
      await this.installComponent(component, dir);
    }
  }
}

export default InstallComponentManager;
