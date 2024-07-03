import { InitializeParams } from "../types/models/initialize-params";
import BaseModel from "./base-model";
import { LevelInstanceStatusAttributes, LevelInstanceStatusCreationAttributes } from "../types/models/level-instance-status";
import levelInstanceStatusSchema from "../schemas/level-instance-status-schema";

class LevelInstanceStatusModel extends BaseModel<LevelInstanceStatusAttributes, LevelInstanceStatusCreationAttributes> {
  public static initialize(params: InitializeParams) {
    LevelInstanceStatusModel.init(levelInstanceStatusSchema, {
      tableName: "level_instance_status",
      ...params,
    });
  }
}

export default LevelInstanceStatusModel;
