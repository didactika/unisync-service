import BaseEntity from "../../../../core/classes/entities/base-entity";
import CourseCampusModel from "../../db/models/course-campus-model";
import { ICourseCampus } from "../../types/classes/entities/course-campus-interface";

class CourseCampus extends BaseEntity<ICourseCampus> implements ICourseCampus {
  public readonly id: number | undefined;
  public readonly campusId: number;
  public readonly courseId: number;
  private _categoryId: number;
  private _idOnCampus: number;

  constructor(courseCampus: ICourseCampus) {
    super(courseCampus);
    this.id = courseCampus.id;
    this.campusId = courseCampus.campusId;
    this.courseId = courseCampus.courseId;
    this._categoryId = courseCampus.categoryId;
    this._idOnCampus = courseCampus.idOnCampus;
  }

  // Getters
  get categoryId(): number {
    return this._categoryId;
  }

  get idOnCampus(): number {
    return this._idOnCampus;
  }

  // Setters
  set categoryId(value: number) {
    this._categoryId = value;
  }

  set idOnCampus(value: number) {
    this._idOnCampus = value;
  }

  public toJSON(): ICourseCampus {
    return {
      id: this.id,
      campusId: this.campusId,
      courseId: this.courseId,
      categoryId: this._categoryId,
      idOnCampus: this._idOnCampus,
    };
  }

  public async create(): Promise<ICourseCampus> {
    return (
      await CourseCampusModel.create({
        campusId: this.campusId,
        courseId: this.courseId,
        categoryId: this._categoryId,
        idOnCampus: this._idOnCampus,
      })
    ).dataValues as ICourseCampus;
  }

  public async update(): Promise<ICourseCampus> {
    const [numberOfAffectedRows, affectedRows] = await CourseCampusModel.update(
      {
        categoryId: this._categoryId,
        idOnCampus: this._idOnCampus,
      },
      {
        where: { id: this.id },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("CourseCampus not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as ICourseCampus;
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await CourseCampusModel.destroy({
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

export default CourseCampus;
