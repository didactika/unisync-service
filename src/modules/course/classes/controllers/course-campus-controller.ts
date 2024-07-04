import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import { CourseCreatedEventData } from "../../types/events/course-created";
import Course from "../entities/course";

export default class CourseCampusController{
  public static async importCourseCampusData(courseData: CourseCreatedEventData): Promise<void> {
    const course = await Course.findOne({id: courseData.uuid});
    if(!course) return;
    //const campusCourseActions = new CampusConnectorCourse(); 
  }
}