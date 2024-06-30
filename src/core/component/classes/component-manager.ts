import { ComponentConfig } from "../../../types/component-config";
import components from "../../../config/components.json";
import ComponentLoader from "./component-loader";
import InstalledComponent from "../db/models/installed-component-model";
import DB from "../../db";
import path from "path";
import { LoadPathEnum } from "../enums/load-path-enum";

class ComponentManager {
  private _components: ComponentConfig = components;

  constructor() {
    this.initializeModels().then(() => {
      this.installComponents();
    });
  }

  private async initializeModels(): Promise<void> {
    await ComponentLoader.loadComponents({
      directoryPath: LoadPathEnum.CORE,
      componentDirectories: ["component"],
      directory: "db/models",
      method: "initialize",
      params: { sequelize: DB.getInstance().sequelize, componentType: "systemtypes" },
    });
  }

  private async getVersionInfo(dir: string): Promise<any | undefined> {
    const versionPath = `../../../modules/${dir}/version.ts`;
    try {
      const versionInfo = await import(versionPath);
      return versionInfo;
    } catch (error) {
      console.error(`Error loading version info for component: ${dir}`);
    }
  }

  private async installComponent(component: string, dir: string): Promise<void> {
    const versionInfo = await this.getVersionInfo(dir);
    if (!versionInfo) {
      console.error(`Error loading version info for component: ${component}`);
      return;
    }
    const isInstalled = await this.isComponentInstalled(versionInfo);

    if (!isInstalled) {
      await ComponentLoader.loadComponents({
        componentsToSearch: [component],
        specificFile: "install.ts",
        directory: "db",
        method: "execute",
      });
      await this.registryComponent(dir, versionInfo);
    }
  }

  private async registryComponent(dir: string, versionInfo: any): Promise<void> {
    console.log(`Registering component: ${versionInfo.default.component}`);

    await InstalledComponent.create({
      name: versionInfo.default.component,
      version: versionInfo.default.version,
      versionFilePath: path.join(__dirname, `../../modules/${dir}/version.ts`),
    });
  }

  private async isComponentInstalled(versionInfo: any): Promise<boolean> {
    const installedModule = await InstalledComponent.findOne({ where: { name: versionInfo.default.component } });
    return installedModule !== null;
  }

  public installComponents(): void {
    for (const [type, plugins] of Object.entries(this._components)) {
      for (const [plugin, dir] of Object.entries(plugins)) {
        this.installComponent(plugin, dir);
      }
    }
  }

  public static getComponentType(directory: string): string {
    for (const [type, plugins] of Object.entries(components as ComponentConfig)) {
      for (const [plugin, dir] of Object.entries(plugins)) {
        if (dir === directory) {
          return plugin;
        }
      }
    }
    return "unknown";
  }
}

export default ComponentManager;
