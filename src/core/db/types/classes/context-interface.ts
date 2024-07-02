import { ContextCreationAttributes } from "../db/models/context";

export interface IContext extends ContextCreationAttributes {
  id?: number;
}
