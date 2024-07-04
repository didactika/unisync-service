import { Application, Router } from "express";
import ComponentLoader from "../../component/classes/component-loader";
import path from "path";
import fs from "fs";
import InstallComponentManager from "../../component/classes/manager/install-component-manager";
import { ComponentInfo } from "../../component/types/classes/manager/install-component-manager-types";

/**
 * Load controllers from all modules and register their routes.
 * @param app - The Express application.
 */
export async function loadControllersAndRegisterRoutes(app: Application) {
  const { pluginsalreadyInstalled } = await InstallComponentManager.getInstance().findComponentsInDb({
    includeSubsystem: true,
    includeSystem: true,
  });

  for (const componentInfo of pluginsalreadyInstalled) {
    const componentPath = path.join(__dirname, "/../../../core", componentInfo.dir, "api/controllers");
    if (fs.existsSync(componentPath)) {
      const files = ComponentLoader.loadFilesFromDirectory(componentPath);
      for (const file of files) {
        const filePath = path.join(componentPath, file);
        if (filePath.endsWith(".ts") || filePath.endsWith(".js")) {
          const ControllerClass = (await import(filePath)).default;
          if (ControllerClass) {
            const controller = new ControllerClass();
            if (controller.basePath && controller.router) {
              console.log(`Registered routes for ${controller.router}`);
              app.use("/", controller.router);
            }
          }
        }
      }
    } else {
      console.log(`Controller directory not found for component: ${componentInfo.component}`);
    }
  }
}
