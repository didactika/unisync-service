import BaseModel from "../../../../core/db/models/base-model";
import { InitializeParams } from "../../../../core/db/types/models/initialize-params";
import CourseModel from "../../../course/db/models/course-model";
import { GroupAttributes, GroupCreationAttributes } from "../../types/db/models/group";
import groupSchema from "../schemas/group-schema";

class GroupModel extends BaseModel<GroupAttributes, GroupCreationAttributes> {
  public static initialize(params: InitializeParams) {
    GroupModel.init(groupSchema, {
      tableName: "group",
      ...params,
    });
  }

  protected static associate() {
    GroupModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
  }

  protected static initializeRequiredModels(params: InitializeParams) {
    CourseModel.initialize(params);
  }
}

export default GroupModel;
