import BaseModel from "../../../../core/db/models/base-model";
import GroupModel from "../../../group/db/models/group-model";
import { GroupingGroupAttributes, GroupingGroupCreationAttributes } from "../../types/db/models/grouping-group";
import groupingGroupSchema from "../schemas/grouping-group-schema";
import GroupingModel from "./grouping-model";

class GroupingGroupModel extends BaseModel<GroupingGroupAttributes, GroupingGroupCreationAttributes> {
  protected static requiredModels = [GroupModel, GroupingModel];
  public static initialize() {
    GroupingGroupModel.init(groupingGroupSchema, {
      sequelize: this._sequelize,
      tableName: "grouping_group",
    });
  }

  protected static associate() {
    GroupingGroupModel.belongsTo(GroupModel, {
      foreignKey: "groupId",
      as: "group",
    });
    GroupingGroupModel.belongsTo(GroupingModel, {
      foreignKey: "groupingId",
      as: "grouping",
    });
  }
}

export default GroupingGroupModel;
