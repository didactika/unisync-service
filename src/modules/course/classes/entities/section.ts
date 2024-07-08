import BaseEntity from "../../../../core/classes/entities/base-entity";
import SectionModel from "../../db/models/section-model";
import { ISection, SectionFilter } from "../../types/classes/entities/section-types";

export default class Section extends BaseEntity<ISection> implements ISection {
  private _courseId: number;
  private _name: string;
  private _position: number;
  private _visible: boolean;
  private _availability: string;

  constructor(section: ISection) {
    super(section);
    this._courseId = section.courseId;
    this._name = section.name;
    this._position = section.position;
    this._visible = section.visible;
    this._availability = section.availability;
  }

  //Getters
  get courseId(): number {
    return this._courseId;
  }

  get name(): string {
    return this._name;
  }

  get position(): number {
    return this._position;
  }

  get visible(): boolean {
    return this._visible;
  }

  get availability(): string {
    return this._availability;
  }

  //Setters

  set courseId(value: number) {
    this._courseId = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set position(value: number) {
    this._position = value;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  set availability(value: string) {
    this._availability = value;
  }

  public toJSON(): ISection {
    return {
      id: this.id,
      courseId: this.courseId,
      name: this.name,
      position: this.position,
      visible: this.visible,
      availability: this.availability,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<ISection> {
    return (
      await SectionModel.create({
        courseId: this.courseId,
        name: this.name,
        position: this.position,
        visible: this.visible,
        availability: this.availability,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      })
    ).dataValues as ISection;
  }

  public async update(): Promise<ISection> {
    const [numberOfAffectedRows, affectedRows] = await SectionModel.update(
      {
        courseId: this.courseId,
        name: this.name,
        position: this.position,
        visible: this.visible,
        availability: this.availability,
        updatedAt: new Date(),
      },
      { where: { id: this.id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("Course not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as ISection;
  }

  public static async findOne<ISection>(filter?: SectionFilter): Promise<ISection | null> {
    const section = await SectionModel.findOne(filter ? { where: filter } : {});
    return section ? (section as ISection) : null;
  }

  public static async findMany<ISection>(filter?: SectionFilter): Promise<ISection[]> {
    return (await SectionModel.findAll(filter ? { where: filter } : {})).map((course) => course.dataValues as ISection);
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await SectionModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Course not found");
    }

    return numberOfAffectedRows;
  }
}
