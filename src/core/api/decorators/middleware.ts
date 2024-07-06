export function Middleware(method?: string, path?: string,) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.constructor.configs) {
      target.constructor.configs = [];
    }
    target.constructor.configs.push({ type: 'middleware', method, path, handler: descriptor.value });
    console.log(`Middleware added: [${method || 'ALL'}] ${path || 'ALL PATHS'} -> ${descriptor.value.name}`);
  };
}