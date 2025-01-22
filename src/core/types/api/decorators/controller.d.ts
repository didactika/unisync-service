import { EDecoratorType } from "../../../enums/api/decorators/decorator-type-enum";

type MiddlewareConfig = {
  method?: string;
  path?: string;
  handler: any;
  type: EDecoratorType.MIDDLEWARE;
};

type RouteConfig = {
  method: string;
  path: string;
  handler: any;
  type: EDecoratorType.ROUTE;
};

export type RouteOrMiddlewareConfig = MiddlewareConfig | RouteConfig;
