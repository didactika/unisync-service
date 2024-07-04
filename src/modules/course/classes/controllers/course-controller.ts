import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import Campus from "../../../../core/campus/classes/entities/campus";
import { CampusCreationData } from "../../../../core/campus/types/classes/controllers/campus-controller";
import { ICampus } from "../../../../core/campus/types/classes/entities/campus-interface";
import { CampusCreatedEventData } from "../../../../core/campus/types/events/campus-created";
import { ECourseType } from "../../enums/course-type-enum";
import { ICourse } from "../../types/classes/entities/course-interface";
import Course from "../entities/course";

export default class CourseController {
  public static async importCampusCourses(campusData: CampusCreatedEventData): Promise<ICourse[]> {
    const campus = (await Campus.findOne(campusData)) as ICampus;
    if (!campus) return [];
    const campusCourseActions = new CampusConnectorCourse(campus);
    const courses = await campusCourseActions.getCourses();
    const coursesPromises: Promise<ICourse>[] = [];
    courses.forEach((course) => {
      const courseDB = new Course({
        idnumber: course.idnumber,
        fullname: course.fullname,
        shortname: course.shortname,
        type: ECourseType.BASE,
      });
      coursesPromises.push(courseDB.create());
    });

    const coursesDB = await Promise.all(coursesPromises);
    return coursesDB;
  }
}
