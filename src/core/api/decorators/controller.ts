import { Router } from "express";
import UserController from "../../user/api/controllers/user";

export function Controller(basePath: string): ClassDecorator {
  return function (target: any) {
    target.prototype.basePath = basePath;
    const router = Router({
      strict: true,
    });

    console.log(`Controller basePath: ${basePath}`);

    // Register middlewares defined in the class
    if (target.middlewares) {
      target.middlewares.forEach((middleware: any) => {
        target.prototype.router.use(middleware.path, middleware.handler.bind(target.prototype));
        console.log(`Registered middleware: ${middleware.path}`);
      });
    }

    // Register routes defined in the class
    if (target.routes) {
      target.routes.forEach((route: any) => {
        router.get("/", (req:any, res:any) => {
            res.send("Hello World!");
        })
      });
    }
    target.prototype.router = router;
  };
}
