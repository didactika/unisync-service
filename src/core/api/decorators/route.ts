export function Route(method: string, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.constructor.configs) {
      target.constructor.configs = [];
    }
    target.constructor.configs.push({ type: "route", method, path, handler: descriptor.value });
    console.log(`Route added: [${method.toUpperCase()}] ${path} -> ${descriptor.value.name}`);
  };
}
