import BaseModel from "../../../../core/db/models/base-model";
import { InitializeParams } from "../../../../core/db/types/models/initialize-params";
import CourseModel from "../../../course/db/models/course-model";
import { GroupingAttributes, GroupingCreationAttributes } from "../../types/db/models/grouping";
import groupingSchema from "../schemas/grouping-schema";

class GroupingModel extends BaseModel<GroupingAttributes, GroupingCreationAttributes> {
  public static initialize(params: InitializeParams) {
    GroupingModel.init(groupingSchema, {
      tableName: "grouping",
      ...params,
    });
  }

  protected static associate() {
    GroupingModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
  }

  protected static initializeRequiredModels(params: InitializeParams) {
    CourseModel.initialize(params);
  }
}

export default GroupingModel;
