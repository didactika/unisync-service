import BaseModel from "../../../../core/db/models/base-model";
import CourseModel from "../../../course/db/models/course-model";
import SectionModel from "../../../course/db/models/section.model";
import { CourseModuleAttributes, CourseModuleCreationAttributes } from "../../types/db/models/course-module";
import courseModuleSchema from "../schemas/course-module-schema";
import ModuleModel from "./module-model";

class CourseModuleModel extends BaseModel<CourseModuleAttributes, CourseModuleCreationAttributes> {
  protected static requiredModels = [CourseModel, ModuleModel, SectionModel];
  public static initialize() {
    CourseModuleModel.init(courseModuleSchema, {
      sequelize: this._sequelize,
      tableName: "course_module",
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
    CourseModuleModel.belongsTo(SectionModel, {
      foreignKey: "sectionId",
      as: "section",
    });
  }
}

export default CourseModuleModel;
