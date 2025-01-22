import { Application } from "express";
import ComponentLoader from "../../component/classes/component-loader";
import path from "path";
import fs from "fs";
import InstallComponentManager from "../../component/classes/manager/install-component-manager";
import { ComponentManager } from "../../component/classes/manager/component-manager";
import { EComponentNature } from "../../component/enums/component-nature-enum";
import { ELoadPath } from "../../component/enums/load-path-enum";
import version from "../../../version";


const coreComponentInfo = {
  component: version.component,
  dir: ''
}
/**
 * Load controllers from all modules and register their routes.
 * @param app - The Express application.
 */
export async function loadControllersAndRegisterRoutes(app: Application) {
  const { pluginsalreadyInstalled } = await InstallComponentManager.getInstance().findComponentsInDb({
    includeSubsystem: true,
    includeSystem: true,
  });

  for (const componentInfo of [coreComponentInfo, ...pluginsalreadyInstalled]) {
    const componentNature = ComponentManager.getComponentNature(componentInfo.dir);
    const componentPath = path.join(
      __dirname,
      "/../../..",
      componentNature === EComponentNature.SYSTEM ? ELoadPath.CORE : ELoadPath.MODULES,
      componentInfo.dir,
      "api/controllers"
    );
    console.log(`Loading controllers from: ${componentPath}`);

    if (fs.existsSync(componentPath)) {
      const files = ComponentLoader.loadFilesFromDirectory(componentPath);
      for (const file of files) {
        const filePath = path.join(componentPath, file);
        if (filePath.endsWith(".ts") || filePath.endsWith(".js")) {
          const ControllerClass = (await import(filePath)).default;
          if (ControllerClass && ControllerClass.prototype) {
            const controller = new ControllerClass();
            if (controller.basePath && controller.router) {
              app.use(controller.basePath, controller.router);
            }
          }
        }
      }
    } else {
      console.log(`Controller directory not found for component: ${componentInfo.component}`);
    }
  }
}
