import BaseModel from "../../../../core/db/models/base-model";
import { InitializeParams } from "../../../../core/db/types/models/initialize-params";
import { ModuleAttributes, ModuleCreationAttributes } from "../../types/db/models/module";
import moduleSchema from "../schemas/module-schema";

class ModuleModel extends BaseModel<ModuleAttributes, ModuleCreationAttributes> {
  public static initialize(params: InitializeParams) {
    ModuleModel.init(moduleSchema, {
      tableName: "module",
      ...params,
    });
  }
}

export default ModuleModel;
