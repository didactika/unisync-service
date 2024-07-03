import BaseModel from "../../../../core/db/models/base-model";
import { InitializeParams } from "../../../../core/db/types/models/initialize-params";
import { CourseAttributes, CourseCreationAttributes } from "../../types/db/models/course";
import courseSchema from "../schemas/course-schema";

class CourseModel extends BaseModel<CourseAttributes, CourseCreationAttributes> {
  public static initialize(params: InitializeParams) {
    CourseModel.init(courseSchema, {
      tableName: "course",
      ...params,
    });
  }
}

export default CourseModel;
