import { ComponentConfig } from "../../../../types/component-config";
import components from "../../../../config/components.json";
import ComponentLoader from "../component-loader";
import DB from "../../../db";
import { EComponentNature } from "../../enums/component-nature-enum";
import { ComponentInfo } from "../../types/classes/manager/install-component-manager-types";

export abstract class ComponentManager {
  protected _components: ComponentConfig = components;

  protected async getVersionInfo(dir: string): Promise<any | undefined> {
    const basePath = ComponentLoader.getComponentPath(dir);
    const paths = [`${basePath}/version.ts`, `${basePath}/version.js`];
  
    for (const path of paths) {
      try {
        console.log(`Trying to load version info from: ${path}`);
        return await import(path);
      } catch (error) {
        console.warn(`Failed to load version info from: ${path} - ${(error as Error).message}`);
      }
    }
  
    console.error(`Unable to load version info for component: ${dir}`);
    return undefined;
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
    return EComponentNature.SYSTEM;
  }

  protected static async initializeExistingComponentsModels(componentsData: ComponentInfo[]): Promise<void> {
    for (const data of componentsData) {
      await DB.initializeModel(data.component);
    }
  }
}
