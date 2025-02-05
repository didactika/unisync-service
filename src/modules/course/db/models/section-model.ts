import BaseModel from "../../../../core/db/models/base-model";
import { SectionAttributes, SectionCreationAttributes } from "../../types/db/models/section";
import sectionSchema from "../schemas/section-schema";
import CourseModel from "./course-model";

class SectionModel extends BaseModel<SectionAttributes, SectionCreationAttributes> {
  protected static requiredModels = [CourseModel];
  public static initialize() {
    SectionModel.init(sectionSchema, {
      sequelize: this._sequelize,
      tableName: "section",
    });
  }

  protected static associate() {
    SectionModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
  }
}

export default SectionModel;
