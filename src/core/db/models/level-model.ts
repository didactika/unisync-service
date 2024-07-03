import levelSchema from "../schemas/level-schema";
import { LevelAttributes, LevelCreationAttributes } from "../types/models/level";
import { InitializeParams } from "../types/models/initialize-params";
import BaseModel from "./base-model";

class LevelModel extends BaseModel<LevelAttributes, LevelCreationAttributes> {
  public static initialize(params: InitializeParams) {
    LevelModel.init(levelSchema, {
      tableName: "levels",
      ...params,
    });
  }
}

export default LevelModel;
