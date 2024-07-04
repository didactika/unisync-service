import { Sequelize } from "sequelize";
import BaseModel from "../../../../core/db/models/base-model";
import { CourseAttributes, CourseCreationAttributes } from "../../types/db/models/course";
import courseSchema from "../schemas/course-schema";

class CourseModel extends BaseModel<CourseAttributes, CourseCreationAttributes> {
  public static initialize() {
    CourseModel.init(courseSchema, {
      sequelize: this._sequelize,
      tableName: "course",
    });
  }
}

export default CourseModel;
