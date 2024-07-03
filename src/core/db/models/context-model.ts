import contextSchema from "../schemas/context-schema";
import { ContextAttributes, ContextCreationAttributes } from "../types/models/context";
import { InitializeParams } from "../types/models/initialize-params";
import BaseModel from "./base-model";

class contextModel extends BaseModel<ContextAttributes, ContextCreationAttributes> {
  public static initialize(params: InitializeParams) {
    contextModel.init(contextSchema, {
      tableName: "contexts",
      ...params,
    });
  }
}

export default contextModel;
