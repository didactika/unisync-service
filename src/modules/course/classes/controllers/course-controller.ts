import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import Campus from "../../../../core/campus/classes/entities/campus";
import { ICampus } from "../../../../core/campus/types/classes/entities/campus-interface";
import CourseModel from "../../db/models/course-model";
import { ECourseType } from "../../enums/course-type-enum";
import { ICourse } from "../../types/classes/entities/course-interface";
import Course from "../entities/course";
import CourseCampus from "../entities/course-campus";

export default class CourseController {
  public static async syncCoursesFromCampus(campusId: number): Promise<ICourse[]> {
    const campus = (await Campus.findOne({ id: campusId })) as ICampus;
    if (!campus) return [];
    const campusCourseActions = new CampusConnectorCourse(campus);
    const courses = await campusCourseActions.getCourses();
    const coursesPromises: Promise<ICourse>[] = [];
    //TODO: I THINK THAT THE BEST METHOD IS THAT THE PROMISES WAS ALL IN THE FOR LOOP AND THEN RETURN THE PROMISE.ALL
    for (const course of courses) {
      const courseCampus = await CourseCampus.findOne({
        campus: {
          id: campusId,
        },
        course: { shortname: course.shortname },
      });
      if (!courseCampus) continue; // TODO: VERIFY IF COURSE HAVE CHANGES AND UPDATE COURSE TABLE IF NECESSARY THIS IS ANOTHER FUNCTION
      const courseDB = new Course({
        idnumber: course.idnumber,
        fullname: course.fullname,
        shortname: course.shortname,
        type: ECourseType.BASE,
      });
      //TODO: ADD COURSE TO CAMPUS AND CATEGORY (IF CATEGORY NOT FOUND, SYNC CATEGORIES FIRST IN ANOTHER FUNCTION THAT WILL BE CALLED HERE FROM CATEGORY CONTROLLER);
      coursesPromises.push(courseDB.create());
    }

    const coursesDB = await Promise.all(coursesPromises);
    return coursesDB;
  }
}
