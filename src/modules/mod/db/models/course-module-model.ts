import BaseModel from "../../../../core/db/models/base-model";
import { InitializeParams } from "../../../../core/db/types/models/initialize-params";
import CourseModel from "../../../course/db/models/course-model";
import { CourseModuleAttributes, CourseModuleCreationAttributes } from "../../types/db/models/course-module";
import courseModuleSchema from "../schemas/course-module-schema";
import ModuleModel from "./module-model";

class CourseModuleModel extends BaseModel<CourseModuleAttributes, CourseModuleCreationAttributes> {
  public static initialize(params: InitializeParams) {
    CourseModuleModel.init(courseModuleSchema, {
      tableName: "course_module",
      ...params,
    });
  }

  protected static associate() {
    CourseModuleModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
    CourseModuleModel.belongsTo(ModuleModel, {
      foreignKey: "moduleId",
      as: "module",
    });
  }

  protected static initializeRequiredModels(params: InitializeParams) {
    CourseModel.initialize(params);
    ModuleModel.initialize(params);
  }
}

export default CourseModuleModel;
