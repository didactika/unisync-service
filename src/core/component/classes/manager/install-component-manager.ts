import { VersionInfo } from "../../../../types/version-info";
import ComponentLoader from "../component-loader";
import DB from "../../../db";
import { ComponentManager } from "./component-manager";
import InstalledComponent from "../entities/installed-component";
import { ComponentInfo, VerifyPluginsOptions } from "../../types/classes/manager/install-component-manager-types";
import { EComponentNature } from "../../enums/component-nature-enum";
import path from "path";
import { ELoadPath } from "../../enums/load-path-enum";
import fs from "fs/promises";

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
      const { pluginsToInstall, pluginsAlreadyInstalled } = await InstallComponentManager.instance.findComponentsInDb({
        includeSubsystem: true,
        includeSystem: true,
        includePlugin: true,
      });
      await InstallComponentManager.instance.installComponents(pluginsToInstall);
      await InstallComponentManager.initializeExistingComponentsModels(pluginsAlreadyInstalled);
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

  public async isComponentInstalled(versionInfo: { default: VersionInfo }): Promise<boolean> {
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

  public async findComponentsInDb(options?: VerifyPluginsOptions): Promise<{
    pluginsToInstall: ComponentInfo[];
    pluginsAlreadyInstalled: ComponentInfo[];
  }> {
    const pluginsToInstall: ComponentInfo[] = [];
    const pluginsAlreadyInstalled: ComponentInfo[] = [];

    const getSubdirectories = async (baseDir: string): Promise<string[]> => {
      try {
        const entries = await fs.readdir(ComponentLoader.getComponentPath(baseDir), { withFileTypes: true });
        return entries
          .filter((entry) => entry.isDirectory())
          .map((entry) => path.join(baseDir, entry.name));
      } catch (error) {
        console.error(`❌ Error al leer subdirectorios en ${baseDir}:`, error);
        return [];
      }
    };

    for (const [pluginKey, pluginData] of Object.entries(this._components)) {
      for (const [component, componentPath] of Object.entries(pluginData)) {
        if (!options?.includeSystem && pluginKey.includes(EComponentNature.SYSTEM)) {
          console.log(`Skipping non-system component: ${component}`);
          continue;
        }

        if (!options?.includeSubsystem && pluginKey.includes(EComponentNature.SUBSYSTEM)) {
          console.log(`Skipping non-subsystem component: ${component}`);
          continue;
        }

        if (!options?.includePlugin && pluginKey.includes(EComponentNature.PLUGIN)) {
          console.log(`Skipping plugins component: ${component}`);
          continue;
        }

        let directoriesToCheck = [componentPath];
        if (pluginKey.includes(EComponentNature.PLUGIN)) {
          const subdirectories = await getSubdirectories(componentPath);
          directoriesToCheck.pop();
          directoriesToCheck.push(...subdirectories);
          console.log(`📂 Subdirectorios encontrados en ${componentPath}:`, subdirectories);
        }

        for (const directory of directoriesToCheck) {
          const versionInfo = await this.getVersionInfo(directory);
          const isInstalled = versionInfo ? await this.isComponentInstalled(versionInfo) : false;

          if (!isInstalled) {
            pluginsToInstall.push({
              component,
              dir: directory,
            });
          } else {
            pluginsAlreadyInstalled.push({
              component,
              dir: directory,
            });
          }
        }
      }
    }

    return { pluginsToInstall, pluginsAlreadyInstalled };
  }

  public async installComponents(plugins: ComponentInfo[]): Promise<void> {
    for (const plugin of plugins) {
      const { component, dir } = plugin;
      await this.installComponent(component, dir);
    }
  }
}

export default InstallComponentManager;
