import BaseModel from "../../../db/models/base-model";
import { InitializeParams } from "../../../db/types/models/initialize-params";
import { ComponentLogAttributes } from "../../types/db/models/component-log";
import componentLogSchema from "../schemas/component-log-schema";

class ComponentLog extends BaseModel<ComponentLogAttributes> {
  public static initialize(params: InitializeParams) {
    ComponentLog.init(componentLogSchema, {
      ...params,
      tableName: "component_logs",
    });
  }
}

export default ComponentLog;
