import { Router } from "express";

export function Controller(basePath: string): ClassDecorator {
  return function (target: any) {
    target.prototype.basePath = basePath;
    target.prototype.router = Router();
    
    // Register middlewares defined in the class
    if (target.middlewares) {
      target.middlewares.forEach((middleware: any) => {
        target.prototype.router.use(middleware.path, middleware.handler.bind(target));
      });
    }

    // Register routes defined in the class
    if (target.constructor.routes) {
      target.constructor.routes.forEach((route: any) => {
        target.prototype.router[route.method](route.path, route.handler.bind(target));
      });
    }
  };
}