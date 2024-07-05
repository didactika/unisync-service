import CampusModel from "../../../../core/campus/db/models/campus";
import BaseEntity from "../../../../core/classes/entities/base-entity";
import CategoryModel from "../../../../core/db/models/category-model";
import CourseCampusModel from "../../db/models/course-campus-model";
import CourseModel from "../../db/models/course-model";
import { ICourseCampus } from "../../types/classes/entities/course-campus-interface";
import { CampusFilter } from "../../../../core/campus/types/classes/entities/campus-filter";
import { CourseFilter } from "../../types/classes/entities/course-filter";

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

  public static async findOne<ICourseCampus>(filters?: {
    campus?: CampusFilter;
    course?: CourseFilter;
    category?: any;
    base?: {
      id?: number;
      idOnCampus?: number;
      createdAt?: Date;
      updatedAt?: Date;
    };
  }): Promise<ICourseCampus | null> {
    const include = this.getIncludeForFind(filters!);
    const course = await CourseCampusModel.findOne(filters?.base ? { where: filters.base, include } : { include });
    return course ? (course as ICourseCampus) : null;
  }

  public static async findMany<ICourseCampus>(filters?: {
    campus?: CampusFilter;
    course?: CourseFilter;
    category?: any;
    base?: {
      id?: number;
      idOnCampus?: number;
      createdAt?: Date;
      updatedAt?: Date;
    };
  }): Promise<ICourseCampus[]> {
    const include = this.getIncludeForFind(filters!);
    return (await CourseCampusModel.findAll(filters?.base ? { where: filters.base, include } : { include })).map(
      (course) => course.dataValues as ICourseCampus
    );
  }

  private static getIncludeForFind(filters: { campus?: CampusFilter; course?: CourseFilter; category?: any }) {
    return [
      {
        model: CourseModel,
        as: "course",
        where: filters.course ? filters.course : {},
      },
      {
        model: CampusModel,
        as: "campus",
        where: filters.campus ? filters.campus : {},
      },
      {
        model: CategoryModel,
        as: "category",
        where: filters.category ? filters.category : {},
      },
    ];
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
