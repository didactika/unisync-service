import BaseModel from "../../../db/models/base-model";
import { ComponentLogAttributes } from "../../types/db/models/component-log";
import componentLogSchema from "../schemas/component-log-schema";

class ComponentLogModel extends BaseModel<ComponentLogAttributes> {
  public static initialize() {
    ComponentLogModel.init(componentLogSchema, {
      sequelize: this._sequelize,
      tableName: "component_logs",
    });
  }
}

export default ComponentLogModel;
