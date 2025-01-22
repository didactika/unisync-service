import CampusModel from "../../../../core/campus/db/models/campus";
import BaseEntity from "../../../../core/classes/entities/base-entity";
import CategoryModel from "../../../../core/db/models/category-model";
import { EMigrationStatus } from "../../../../core/enums/migration-status-enum";
import CourseMigrationInformationModel from "../../db/models/course-migration-information-model";
import CourseModel from "../../db/models/course-model";
import {
  CourseMigrationInformationFilter,
  ICourseMigrationInformation,
} from "../../types/classes/entities/course-migration-information-types";

class CourseMigrationInformation
  extends BaseEntity<ICourseMigrationInformation>
  implements ICourseMigrationInformation
{
  public readonly uuid?: string | undefined;
  private _courseId?: number;
  private _courseOriginId: number;
  private _courseTargetId?: number;
  private _courseTemplateId?: number;
  private _campusOriginId: number;
  private _campusTargetId: number;
  private _status: EMigrationStatus;

  constructor(courseMigrationInformation: ICourseMigrationInformation) {
    super(courseMigrationInformation);
    this._courseId = courseMigrationInformation.courseId;
    this._courseOriginId = courseMigrationInformation.courseOriginId;
    this._courseTargetId = courseMigrationInformation.courseTargetId;
    this._courseTemplateId = courseMigrationInformation.courseTemplateId;
    this._campusOriginId = courseMigrationInformation.campusOriginId;
    this._campusTargetId = courseMigrationInformation.campusTargetId;
    this._status = courseMigrationInformation.status || EMigrationStatus.PENDING;
  }

  // Getters
  get courseId(): number | undefined {
    return this._courseId;
  }

  get courseOriginId(): number {
    return this._courseOriginId;
  }

  get courseTargetId(): number | undefined {
    return this._courseTargetId;
  }

  get courseTemplateId(): number | undefined {
    return this._courseTemplateId;
  }

  get campusOriginId(): number {
    return this._campusOriginId;
  }

  get campusTargetId(): number {
    return this._campusTargetId;
  }

  get status(): EMigrationStatus {
    return this._status;
  }

  // Setters
  set courseId(value: number | undefined) {
    this._courseId = value;
  }

  set courseOriginId(value: number) {
    this._courseOriginId = value;
  }

  set courseTargetId(value: number | undefined) {
    this._courseTargetId = value;
  }

  set courseTemplateId(value: number | undefined) {
    this._courseTemplateId = value;
  }

  set campusOriginId(value: number) {
    this._campusOriginId = value;
  }

  set campusTargetId(value: number) {
    this._campusTargetId = value;
  }

  set status(value: EMigrationStatus) {
    this._status = value;
  }

  public toJSON(): ICourseMigrationInformation {
    return {
      id: this.id,
      uuid: this.uuid,
      courseId: this._courseId,
      courseOriginId: this._courseOriginId,
      courseTargetId: this._courseTargetId,
      courseTemplateId: this._courseTemplateId,
      campusOriginId: this._campusOriginId,
      campusTargetId: this._campusTargetId,
      status: this._status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<ICourseMigrationInformation> {
    return (
      await CourseMigrationInformationModel.create({
        uuid: this.uuid,
        courseId: this._courseId,
        courseOriginId: this._courseOriginId,
        courseTargetId: this._courseTargetId,
        courseTemplateId: this._courseTemplateId,
        campusOriginId: this._campusOriginId,
        campusTargetId: this._campusTargetId,
        status: this._status,
      })
    ).dataValues as ICourseMigrationInformation;
  }

  public static async findOne<ICourseMigrationInformation>(
    filter?: CourseMigrationInformationFilter
  ): Promise<ICourseMigrationInformation | null> {
    const courseMigrationInformation = await CourseMigrationInformationModel.findOne(filter ? { where: filter } : {});
    return courseMigrationInformation ? (courseMigrationInformation as ICourseMigrationInformation) : null;
  }

  public static async findMany<ICourseMigrationInformation>(
    filter?: CourseMigrationInformationFilter
  ): Promise<ICourseMigrationInformation[]> {
    return (await CourseMigrationInformationModel.findAll(filter ? { where: filter } : {})).map(
      (courseMigrationInformation) => courseMigrationInformation.get({ plain: true }) as ICourseMigrationInformation
    );
  }

  public async update(): Promise<ICourseMigrationInformation> {
    const [numberOfAffectedRows, affectedRows] = await CourseMigrationInformationModel.update(
      {
        courseId: this._courseId,
        courseOriginId: this._courseOriginId,
        courseTargetId: this._courseTargetId,
        courseTemplateId: this._courseTemplateId,
        campusOriginId: this._campusOriginId,
        campusTargetId: this._campusTargetId,
        status: this._status,
      },
      {
        where: { id: this.id },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("CourseMigrationInformtion not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as ICourseMigrationInformation;
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await CourseMigrationInformationModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Course Migration Information not found");
    }

    return numberOfAffectedRows;
  }
}

export default CourseMigrationInformation;
