import { ComponentConfig } from "../../../../types/component-config";
import components from "../../../../config/components.json";
import ComponentLoader from "../component-loader";
import DB from "../../../db";
import { ELoadPath } from "../../enums/load-path-enum";

export abstract class ComponentManager {
  protected _components: ComponentConfig = components;

  constructor() {
    this.initializeModels();
  }

  private async initializeModels(): Promise<void> {
    await ComponentLoader.loadComponents({
      directoryPath: ELoadPath.CORE,
      componentDirectories: ["component"],
      directory: "db/models",
      method: "initialize",
      params: { sequelize: DB.getInstance().sequelize, componentType: "systemtypes" },
    });
  }

  protected async getVersionInfo(dir: string): Promise<any | undefined> {
    const versionPath = `${ComponentLoader.getComponentPath(dir)}/version.ts`;
    console.log(`Loading version info for component: ${versionPath}`);
    
    try {
      const versionInfo = await import(versionPath);
      return versionInfo;
    } catch (error) {
      console.error(`Error loading version info for component: ${dir}`);
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

  public static getComponentNature(directory: string): string {
    for (const [type, plugins] of Object.entries(components as ComponentConfig)) {
      for (const [plugin, dir] of Object.entries(plugins)) {
        if (dir === directory) {
          return type;
        }
      }
    }
    return "unknown";
  }
}
