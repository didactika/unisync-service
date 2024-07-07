import BaseEntity from "../../../../core/classes/entities/base-entity";
import GroupingGroupModel from "../../db/models/grouping-group-model";
import { GroupingFilter } from "../../types/classes/entities/grouping-filter";
import { IGroupingGroup } from "../../types/classes/entities/grouping-group-interface";

export default class GroupingGroup extends BaseEntity<IGroupingGroup> implements IGroupingGroup {
  private _groupId: number;
  private _groupingId: number;

  constructor(groupingGroup: IGroupingGroup) {
    super(groupingGroup);
    this._groupId = groupingGroup.groupId;
    this._groupingId = groupingGroup.groupingId;
  }

  //Getters
  get groupId(): number {
    return this._groupId;
  }

  get groupingId(): number {
    return this._groupingId;
  }

  //Setters

  set groupId(value: number) {
    this._groupId = value;
  }

  set groupingId(value: number) {
    this._groupingId = value;
  }

  public toJSON(): IGroupingGroup {
    return {
        id: this.id,
        groupId: this._groupId,
        groupingId: this._groupingId,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<IGroupingGroup> {
    return (
      await GroupingGroupModel.create({
        groupId: this._groupId,
        groupingId: this._groupingId,
      })
    ).dataValues as IGroupingGroup;
  }

  public async update(): Promise<IGroupingGroup> {
    const [numberOfAffectedRows, affectedRows] = await GroupingGroupModel.update(
      {
        groupId: this._groupId,
        groupingId: this._groupingId,
      },
      { where: { id: this.id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("Grouping Group not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as IGroupingGroup;
  }

  public static async findOne<IGroupingGroup>(filter?: GroupingFilter): Promise<IGroupingGroup | null> {
    const groupingGroup = await GroupingGroupModel.findOne(filter ? { where: filter } : {});
    return groupingGroup ? (groupingGroup as IGroupingGroup) : null;
  }

  public static async findMany<IGroupingGroup>(filter?: GroupingFilter): Promise<IGroupingGroup[]> {
    return (await GroupingGroupModel.findAll(filter ? { where: filter } : {})).map(
      (groupingGroup) => groupingGroup.dataValues as IGroupingGroup
    );
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await GroupingGroupModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Grouping Group not found");
    }

    return numberOfAffectedRows;
  }
}
