import BaseModel from "../../../../core/db/models/base-model";
import { ModuleAttributes, ModuleCreationAttributes } from "../../types/db/models/module";
import moduleSchema from "../schemas/module-schema";

class ModuleModel extends BaseModel<ModuleAttributes, ModuleCreationAttributes> {
  public static initialize() {
    ModuleModel.init(moduleSchema, {
      sequelize: this._sequelize,
      tableName: "module",
    });
  }
}

export default ModuleModel;
