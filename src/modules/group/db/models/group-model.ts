import BaseModel from "../../../../core/db/models/base-model";
import CourseModel from "../../../course/db/models/course-model";
import { GroupAttributes, GroupCreationAttributes } from "../../types/db/models/group";
import groupSchema from "../schemas/group-schema";

class GroupModel extends BaseModel<GroupAttributes, GroupCreationAttributes> {
  protected static requiredModels = [CourseModel];
  public static initialize() {
    GroupModel.init(groupSchema, {
      sequelize: this._sequelize,
      tableName: "group",
    });
  }

  protected static associate() {
    GroupModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
  }
}

export default GroupModel;
