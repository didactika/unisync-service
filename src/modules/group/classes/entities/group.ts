import BaseEntity from "../../../../core/classes/entities/base-entity";
import GroupModel from "../../db/models/group-model";
import { GroupFilter } from "../../types/classes/entities/group-filter";
import { IGroup } from "../../types/classes/entities/group-interface";

class Group extends BaseEntity<IGroup> implements IGroup {
  private _idnumber?: string;
  private _name: string;
  private _description?: string;
  private _courseId: number;
  private _idOnCampus: number;

  constructor(group: IGroup) {
    super(group);
    this._name = group.name;
    this._description = group.description;
    this._courseId = group.courseId;
    this._idnumber = group.idnumber;
    this._idOnCampus = group.idOnCampus;
  }

  get idnumber(): string | undefined {
    return this._idnumber;
  }

  get name(): string {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
  }

  get courseId(): number {
    return this._courseId;
  }

  get idOnCampus(): number {
    return this._idOnCampus;
  }

  set idnumber(value: string | undefined) {
    this._idnumber = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  set courseId(value: number) {
    this._courseId = value;
  }

  set idOnCampus(value: number) {
    this._idOnCampus = value;
  }

  public toJSON(): IGroup {
    return {
      id: this.id,
      idnumber: this._idnumber,
      name: this._name,
      description: this._description,
      courseId: this._courseId,
      idOnCampus: this._idOnCampus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<IGroup> {
    return (
      await GroupModel.create({
        idnumber: this._idnumber,
        name: this._name,
        description: this._description,
        courseId: this._courseId,
        idOnCampus: this._idOnCampus,
      })
    ).dataValues as IGroup;
  }

  public async update(): Promise<IGroup> {
    const [numberOfAffectedRows, affectedRows] = await GroupModel.update(
      {
        idnumber: this._idnumber,
        name: this._name,
        description: this._description,
        courseId: this._courseId,
        idOnCampus: this._idOnCampus,
      },
      { where: { id: this.id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("Course not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as IGroup;
  }

  public static async findOne<IGroup>(filter?: GroupFilter): Promise<IGroup | null> {
    const group = await GroupModel.findOne(filter ? { where: filter } : {});
    return group ? (group as IGroup) : null;
  }

  public static async findMany<IGroup>(filter?: GroupFilter): Promise<IGroup[]> {
    return (await GroupModel.findAll(filter ? { where: filter } : {})).map((group) => group.dataValues as IGroup);
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await GroupModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Group not found");
    }

    return numberOfAffectedRows;
  }
}

export default Group;
