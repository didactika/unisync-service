import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import Campus from "../../../../core/campus/classes/entities/campus";
import { NCampusConnectorCourse } from "../../../../core/campus/types/classes/campus-connector/campus-connector-course";
import { ICampus } from "../../../../core/campus/types/classes/entities/campus-interface";
import Category from "../../../../core/classes/entities/category-entity";
import { ICategory } from "../../../../core/types/classes/entities/category-interface";
import { ECourseType } from "../../enums/course-type-enum";
import { ICourseCampus } from "../../types/classes/entities/course-campus-types";
import { ICourse } from "../../types/classes/entities/course-types";
import Course from "../entities/course";
import CourseCampusController from "./course-campus-controller";

export default class CourseController {
  public static async syncFromCampus(campusId: number): Promise<ICourse[]> {
    const campus = (await Campus.findOne({ id: campusId })) as ICampus;
    if (!campus) return [];

    const campusCourseActions = new CampusConnectorCourse(campus);
    const courses = await campusCourseActions.getCourses();

    const coursePromises: Promise<ICourse | null>[] = courses.map(async (course) => {
      const courseCategoryFound = (await Category.findOne<ICategory>({
        idOnCampus: course.categoryid,
        campusId: campusId,
      })) as ICategory;

      if (!courseCategoryFound) return null;

      const courseCampusFound = (await CourseCampusController.findByCourseTypeAndShortname({
        campusId,
        course: { shortname: course.shortname, type: ECourseType.BASE },
      })) as ICourseCampus;

      return courseCampusFound
        ? this.updateFromCampus(course, courseCampusFound, courseCategoryFound)
        : this.createFromCampus(course, courseCategoryFound, campusId);
    });

    const syncedCourses = await Promise.all(coursePromises);
    return syncedCourses.filter((course) => course !== null) as ICourse[];
  }

  private static async createFromCampus(
    courseOnCampus: NCampusConnectorCourse.GetCourseResponse,
    category: ICategory,
    campusId: number
  ): Promise<ICourse> {
    const courseOnDB = new Course({
      idnumber: courseOnCampus.idnumber,
      fullname: courseOnCampus.fullname,
      shortname: courseOnCampus.shortname,
      type: ECourseType.BASE,
    });

    const createdCourse = await courseOnDB.create();

    await CourseCampusController.create({
      campusId: campusId,
      courseId: createdCourse.id!,
      categoryId: category.id!,
      idOnCampus: courseOnCampus.id,
    });

    return createdCourse;
  }

  private static async updateFromCampus(
    courseOnCampus: NCampusConnectorCourse.GetCourseResponse,
    courseCampusFound: ICourseCampus,
    category: ICategory
  ): Promise<ICourse> {
    await CourseCampusController.update(courseCampusFound, {
      categoryId: category.id!,
      idOnCampus: courseOnCampus.id,
    });

    const courseFound = (await Course.findOne({ id: courseCampusFound.courseId })) as ICourse;
    const courseOnDB = new Course(courseFound);
    courseOnDB.fullname = courseOnCampus.fullname;
    courseOnDB.shortname = courseOnCampus.shortname;
    courseOnDB.idnumber = courseOnCampus.idnumber;

    return courseOnDB.update();
  }

  public static async create(course: ICourse): Promise<ICourse> {
    const newCourse = new Course(course);
    return await newCourse.create();
  }

  public static async getCourses(type?: ECourseType): Promise<ICourse[]> {
    return await Course.findMany(type ? { type } : {});
  }
  public static async getCourse(courseId: number): Promise<ICourse | null> {
    return await Course.findOne({ id: courseId });
  }

  public static async courseExists(courseId: number): Promise<boolean> {
    return (await Course.findOne({id: courseId})) !== null;
  }
}
