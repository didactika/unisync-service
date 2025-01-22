export type GroupingGroupAttributes = BaseAttributes & {
  groupId: number;
  groupingId: number;
};

export type GroupingGroupCreationAttributes = Omit<GroupingGroupAttributes, "id">;