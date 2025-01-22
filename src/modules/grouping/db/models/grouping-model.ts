import BaseModel from "../../../../core/db/models/base-model";
import CourseModel from "../../../course/db/models/course-model";
import { GroupingAttributes, GroupingCreationAttributes } from "../../types/db/models/grouping";
import groupingSchema from "../schemas/grouping-schema";

class GroupingModel extends BaseModel<GroupingAttributes, GroupingCreationAttributes> {
  protected static requiredModels = [CourseModel];
  public static initialize() {
    GroupingModel.init(groupingSchema, {
      sequelize: this._sequelize,
      tableName: "grouping",
    });
  }

  protected static associate() {
    GroupingModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
  }
}

export default GroupingModel;
