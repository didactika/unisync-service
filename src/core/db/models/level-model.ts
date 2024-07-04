import levelSchema from "../schemas/level-schema";
import { LevelAttributes, LevelCreationAttributes } from "../types/models/level";
import BaseModel from "./base-model";

class LevelModel extends BaseModel<LevelAttributes, LevelCreationAttributes> {
  public static initialize() {
    LevelModel.init(levelSchema, {
      sequelize: this._sequelize,
      tableName: "level",
    });
  }
}

export default LevelModel;
