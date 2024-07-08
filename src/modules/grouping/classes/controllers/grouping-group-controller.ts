import Group from "../../../group/classes/entities/group";
import { IGroup } from "../../../group/types/classes/entities/group-interface";
import { IGroupingGroup } from "../../types/classes/entities/grouping-group-interface";
import { IGrouping } from "../../types/classes/entities/grouping-interface";
import GroupingGroup from "../entities/grouping-groups";

export default class GroupingGroupController {
  public static async createFromCampus(grouping: IGrouping, groupsIdOnCampus: number[]): Promise<IGroupingGroup[]> {
    const promisesGroupinGroups: Promise<IGroupingGroup | null>[] = groupsIdOnCampus.map(async (groupIdOnCampus) => {
      const groupFound = (await Group.findOne({ courseId: grouping.courseId, idOnCampus: groupIdOnCampus })) as IGroup;
      if (!groupFound) return null;
      const groupingGroupFound = await GroupingGroup.findOne({ groupId: groupFound.id, groupingId: grouping.id });
      if (groupingGroupFound) return null;

      const newGroupingGroup = new GroupingGroup({
        groupId: groupFound.id!,
        groupingId: grouping.id!,
      });

      return newGroupingGroup.create();
    });

    const groupinGroupsCreated = await Promise.all(promisesGroupinGroups);
    return groupinGroupsCreated.filter((groupingGroup) => groupingGroup !== null) as IGroupingGroup[];
  }

  public static async createByGroups(groupingId: number, groupsId: number[]): Promise<IGroupingGroup[]> {
    const promisesGroupinGroups: Promise<IGroupingGroup | null>[] = groupsId.map(async (groupId) => {
      const groupingGroupFound = await GroupingGroup.findOne({ groupId, groupingId });
      if (groupingGroupFound) return null;

      const newGroupingGroup = new GroupingGroup({
        groupId,
        groupingId,
      });

      return newGroupingGroup.create();
    });

    const groupinGroupsCreated = await Promise.all(promisesGroupinGroups);
    return groupinGroupsCreated.filter((groupingGroup) => groupingGroup !== null) as IGroupingGroup[];
  }
  public static async getGroupingGroups(groupingId: number): Promise<IGroupingGroup[]> {
    return await GroupingGroup.findMany({ groupingId });
  }
}
