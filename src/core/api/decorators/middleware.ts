export function Middleware(middleware: any): MethodDecorator {
    return function (target: any, propertyKey: string | symbol) {
      if (!target.constructor.middlewares) {
        target.constructor.middlewares = [];
      }
      target.constructor.middlewares.push({ handler: target[propertyKey] });
    };
  }
  