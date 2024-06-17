import fs from "fs";
import path from "path";
import componentsJSON from "../../config/components.json";
import { ComponentConfig } from "../../types/core/components/component-config";
import { LoadOptions } from "../../types/core/components/load-options";

/**
 * Class responsible for dynamically loading and initializing components.
 */
class ComponentLoader {
  /**
   * Get the component type based on the directory.
   * @param directory - The directory to get the component type for.
   * @returns The component type as a string.
   */
  private static getComponentType(directory: string): string {
    for (const [type, plugins] of Object.entries(componentsJSON as ComponentConfig)) {
      for (const [plugin, dir] of Object.entries(plugins)) {
        if (dir === directory) {
          return plugin;
        }
      }
    }
    return "unknown";
  }

  /**
   * Get the list of component directories.
   * @returns The list of component directories.
   */
  private static getComponentDirectories(componentToSearch?: string[]): string[] {
    if (!componentToSearch || componentToSearch.length === 0)
      return Object.values(componentsJSON as ComponentConfig).flatMap((type) => Object.values(type));

    return Object.values(componentsJSON as ComponentConfig)
      .flatMap((type) => Object.values(type))
      .filter((type) => componentToSearch.includes(type));
  }

  /**
   * Load files from a given directory.
   * @param componentsDir - The directory to load files from.
   * @param specificFile - A specific file to load, if any.
   * @returns The list of files to process.
   */
  private static loadFilesFromDirectory(componentsDir: string, specificFile?: string): string[] {
    if (!fs.existsSync(componentsDir)) {
      return [];
    }
    if (specificFile && fs.existsSync(path.join(componentsDir, specificFile))) {
      return [specificFile];
    }
    return fs.readdirSync(componentsDir);
  }

  /**
   * Import a component file.
   * @param filePath - The path of the file to import.
   * @returns The imported component.
   */
  private static async importComponent(filePath: string): Promise<any> {
    return await import(filePath);
  }

  /**
   * Validate and process the parameters for the component method.
   * @param params - The parameters to pass to the method.
   * @param componentType - The type of the component, if needed.
   * @returns The validated and processed parameters.
   */
  private static validateParams(params: object[] | object, componentType?: string): object[] | object {
    if (componentType) {
      if (Array.isArray(params)) {
        params.push({ componentType });
      } else {
        params = { ...params, componentType };
      }
    }
    return params;
  }

  /**
   * Initialize a component by calling the specified method with parameters.
   * @param component - The component to initialize.
   * @param method - The method to call on the component.
   * @param params - The parameters to pass to the method.
   * @param componentType - The type of the component, if needed.
   */
  private static initializeComponent(component: any, method: string, params: object[] | object | undefined) {
    if (component && component.default && typeof component.default[method] === "function") {
      component.default[method](params ?? {});
    }
  }

  /**
   * Load components from the specified directory and call a method on them.
   * @param options - The options for loading components.
   * @returns The loaded components or null.
   */
  public static async loadComponents(options: LoadOptions = {}) {
    const componentDirectories = this.getComponentDirectories(options.componentsToSearch);
    const directory = options.directory;
    const components: any[] = [];

    for (const component of componentDirectories) {
      const componentsDir = path.join(__dirname, `../../modules/${component}/${directory}`);

      const files = this.loadFilesFromDirectory(componentsDir, options.specificFile);
      const componentType = this.getComponentType(component);

      for (const file of files) {
        const filePath = path.join(componentsDir, file);
        if (filePath.endsWith(".ts") || filePath.endsWith(".js")) {
          const importedComponent = await this.importComponent(filePath);
          if (options.returnFiles) {
            components.push({ file: filePath, component: importedComponent });
          } else if (options.method) {
            const params = options.params
              ? this.validateParams(options.params, options.componentTypeParam ? componentType : undefined)
              : undefined;
            this.initializeComponent(importedComponent, options.method, params);
            console.log(`Component ${file} initialized from ${componentsDir} with componentType ${componentType}`);
          }
        }
      }
    }

    return options.returnFiles ? components : null;
  }
}

export default ComponentLoader;
