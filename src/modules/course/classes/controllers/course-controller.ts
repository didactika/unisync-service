import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import Campus from "../../../../core/campus/classes/entities/campus";
import { NCampusConnectorCourse } from "../../../../core/campus/types/classes/campus-connector/campus-connector-course";
import { ICampus } from "../../../../core/campus/types/classes/entities/campus-interface";
import CategoryController from "../../../../core/classes/controllers/category-controller";
import { ICategory } from "../../../../core/types/classes/entities/category-interface";
import { ECourseType } from "../../enums/course-type-enum";
import { ICourseCampus } from "../../types/classes/entities/course-campus-interface";
import { ICourse } from "../../types/classes/entities/course-interface";
import Course from "../entities/course";
import CourseCampus from "../entities/course-campus";

export default class CourseController {
  public static async syncCoursesFromCampus(campusId: number): Promise<ICourse[]> {
    const campus = (await Campus.findOne({ id: campusId })) as ICampus;
    if (!campus) return [];
    const campusCourseActions = new CampusConnectorCourse(campus);
    const courses = await campusCourseActions.getCourses();
    const syncedCourses: Promise<ICourse>[] = [];

    for (const course of courses) {
      const courseCategoryFound = await CategoryController.syncCategoryFromCampus(campusId, course.categoryid);

      if (!courseCategoryFound) {
        continue;
      }

      const courseCampusFound = (await CourseCampus.findOne({
        campus: {
          id: campusId,
        },
        course: { shortname: course.shortname, type: ECourseType.BASE },
      })) as ICourseCampus;

      courseCampusFound
        ? syncedCourses.push(this.updateFromCampus(course, courseCampusFound, courseCategoryFound, campusId))
        : syncedCourses.push(this.createFromCampus(course, courseCategoryFound, campusId));
    }

    const createdCourses = await Promise.all(syncedCourses);

    return createdCourses;
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

    const courseCampusToCreate = new CourseCampus({
      campusId: campusId,
      categoryId: category.id!,
      idOnCampus: courseOnCampus.id,
      courseId: createdCourse.id!,
    });

    await courseCampusToCreate.create();

    return createdCourse;
  }

  private static async updateFromCampus(
    courseOnCampus: NCampusConnectorCourse.GetCourseResponse,
    courseCampusFound: ICourseCampus,
    category: ICategory,
    campusId: number
  ): Promise<ICourse> {
    const courseCampusOnDB = new CourseCampus(courseCampusFound);
    courseCampusOnDB.categoryId = category.id!;
    courseCampusOnDB.idOnCampus = courseOnCampus.id;

    await courseCampusOnDB.update();

    const courseFound = (await Course.findOne({ id: courseCampusFound.courseId })) as ICourse;
    const courseOnDB = new Course(courseFound);
    courseOnDB.fullname = courseOnCampus.fullname;
    courseOnDB.shortname = courseOnCampus.shortname;
    courseOnDB.idnumber = courseOnCampus.idnumber;

    return courseOnDB.update();
  }
}
