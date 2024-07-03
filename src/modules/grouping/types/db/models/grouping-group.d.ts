export type GroupingGroupAttributes = BaseAttributes & {
  idGroup: number;
  idGrouping: number;
};

export type GroupingGroupCreationAttributes = Omit<GroupingGroupAttributes, "id">;