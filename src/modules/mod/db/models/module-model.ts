import BaseModel from "../../../../core/db/models/base-model";
import { InitializeParams } from "../../../../core/db/types/models/initialize-params";
import { CourseAttributes, CourseCreationAttributes } from "../../../course/types/db/models/course";
import moduleSchema from "../schemas/module-schema";

class ModuleModel extends BaseModel<CourseAttributes, CourseCreationAttributes> {
  public static initialize(params: InitializeParams) {
    ModuleModel.init(moduleSchema, {
      tableName: "module",
      ...params,
    });
  }
}

export default ModuleModel;
