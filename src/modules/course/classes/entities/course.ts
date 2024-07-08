import BaseEntity from "../../../../core/classes/entities/base-entity";
import CourseModel from "../../db/models/course-model";
import { ECourseType } from "../../enums/course-type-enum";
import { CourseFilter, ICourse } from "../../types/classes/entities/course-types";

class Course extends BaseEntity<ICourse> implements ICourse {
  public readonly uuid: string | undefined;
  private _type: ECourseType;
  private _fullname: string;
  private _shortname: string;
  private _idnumber?: string;

  constructor(course: ICourse) {
    super(course);
    this.uuid = course.uuid;
    this._type = course.type;
    this._fullname = course.fullname;
    this._shortname = course.shortname;
    this._idnumber = course.idnumber;
  }

  //Getters
  get type(): ECourseType {
    return this._type;
  }

  get fullname(): string {
    return this._fullname;
  }

  get shortname(): string {
    return this._shortname;
  }

  get idnumber(): string | undefined {
    return this._idnumber;
  }

  //Setters

  set type(value: ECourseType) {
    this._type = value;
  }

  set fullname(value: string) {
    this._fullname = value;
  }

  set shortname(value: string) {
    this._shortname = value;
  }

  set idnumber(value: string | undefined) {
    this._idnumber = value;
  }

  public toJSON(): ICourse {
    return {
      id: this.id,
      uuid: this.uuid,
      type: this.type,
      fullname: this.fullname,
      shortname: this.shortname,
      idnumber: this.idnumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<ICourse> {
    return (
      await CourseModel.create({
        uuid: this.uuid || undefined,
        type: this.type,
        fullname: this.fullname,
        shortname: this.shortname,
        idnumber: this.idnumber,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      })
    ).dataValues as ICourse;
  }

  public async update(): Promise<ICourse> {
    const [numberOfAffectedRows, affectedRows] = await CourseModel.update(
      {
        type: this.type,
        fullname: this.fullname,
        shortname: this.shortname,
        idnumber: this.idnumber,
        updatedAt: this.updatedAt,
      },
      { where: { id: this.id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("Course not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as ICourse;
  }

  public static async findOne<ICourse>(filter?: CourseFilter): Promise<ICourse | null> {
    const course = await CourseModel.findOne(filter ? { where: filter } : {});
    return course ? (course as ICourse) : null;
  }

  public static async findMany<ICourse>(filter?: CourseFilter): Promise<ICourse[]> {
    return (await CourseModel.findAll(filter ? { where: filter } : {})).map((course) => course.dataValues as ICourse);
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await CourseModel.destroy({
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

export default Course;
