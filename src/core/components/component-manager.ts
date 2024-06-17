import { ComponentConfig } from "../../types/core/components/component-config";
import components from "../../config/components.json";
import ComponentLoader from "./component-loader";

class ComponentManager {
  private _components: ComponentConfig = components;

  constructor() {
    this.installComponents();
  }

  private async installComponent(component: string): Promise<void> {
    // Verify if component is installed if not install it
    if ()
    
    await ComponentLoader.loadComponents({
        componentsToSearch: [component],
        specificFile: "install.ts",
        directory: "db",
        method: "execute"
    })
  }

  public installComponents(): void {
    for (const [type, plugins] of Object.entries(this._components)) {
      for (const [plugin, dir] of Object.entries(plugins)) {
        this.installComponent(dir);
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
