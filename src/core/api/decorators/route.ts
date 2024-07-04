export function Route(method: string, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.constructor.routes) {
      target.constructor.routes = [];
    }
    target.constructor.routes.push({ method, path, handler: descriptor.value });
    console.log(`Route added: [${method.toUpperCase()}] ${path} -> ${descriptor.value.name}`);
  };
}