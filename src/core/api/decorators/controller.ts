import { Router } from "express";
import { RouteOrMiddlewareConfig } from "../../types/api/decorators/controller";

export function Controller(basePath: string): ClassDecorator {
  return function (target: any) {
    target.prototype.basePath = basePath;
    target.prototype.router = Router();

    if (target.configs) {
      target.configs.forEach((config: RouteOrMiddlewareConfig) => {
        if (config.type === "middleware") {
          const method = config.method?.toLowerCase();
          if (method && target.prototype.router[method]) {
            target.prototype.router[method](config.path || "*", config.handler.bind(target));
          } else if (config.path) {
            target.prototype.router.use(config.path, config.handler.bind(target));
          } else {
            target.prototype.router.use(config.handler.bind(target));
          }
          console.log(`Registered middleware: [${config.method || "ALL"}] ${config.path || "ALL PATHS"}`);
        } else if (config.type === "route") {
          target.prototype.router[config.method](config.path, config.handler.bind(target));
          console.log(`Registered route: [${config.method.toUpperCase()}] ${config.path} -> ${config.handler.name}`);
        }
      });
    }
  };
}
