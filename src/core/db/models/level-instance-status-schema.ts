import BaseModel from "./base-model";
import {
  LevelInstanceStatusAttributes,
  LevelInstanceStatusCreationAttributes,
} from "../types/models/level-instance-status";
import levelInstanceStatusSchema from "../schemas/level-instance-status-schema";
import LevelModel from "./level-model";

class LevelInstanceStatusModel extends BaseModel<LevelInstanceStatusAttributes, LevelInstanceStatusCreationAttributes> {
  protected static requiredModels = [LevelModel];
  public static initialize() {
    LevelInstanceStatusModel.init(levelInstanceStatusSchema, {
      sequelize: this._sequelize,
      tableName: "level_instance_status",
    });
  }

  protected static associate() {
    LevelInstanceStatusModel.belongsTo(LevelModel, {
      foreignKey: "levelId",
      as: "level",
    });
  }
}

export default LevelInstanceStatusModel;
