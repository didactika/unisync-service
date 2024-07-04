import BaseModel from "./base-model";
import { LevelInstanceStatusAttributes, LevelInstanceStatusCreationAttributes } from "../types/models/level-instance-status";
import levelInstanceStatusSchema from "../schemas/level-instance-status-schema";

class LevelInstanceStatusModel extends BaseModel<LevelInstanceStatusAttributes, LevelInstanceStatusCreationAttributes> {
  public static initialize() {
    LevelInstanceStatusModel.init(levelInstanceStatusSchema, {
      sequelize: this._sequelize,
      tableName: "level_instance_status",
    });
  }
}

export default LevelInstanceStatusModel;
