import BaseModel from "../../../../core/db/models/base-model";
import { InitializeParams } from "../../../../core/db/types/models/initialize-params";
import GroupModel from "../../../group/db/models/group-model";
import { GroupingGroupAttributes, GroupingGroupCreationAttributes } from "../../types/db/models/grouping-group";
import groupingGroupSchema from "../schemas/grouping-group-schema";
import GroupingModel from "./grouping-model";

class GroupingGroupModel extends BaseModel<GroupingGroupAttributes, GroupingGroupCreationAttributes> {
  public static initialize(params: InitializeParams) {
    GroupingGroupModel.init(groupingGroupSchema, {
      tableName: "grouping_group",
      ...params,
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

  protected static initializeRequiredModels(params: InitializeParams) {
    GroupModel.initialize(params);
    GroupingModel.initialize(params);
  }
}

export default GroupingGroupModel;
