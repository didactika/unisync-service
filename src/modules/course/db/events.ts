import CourseCampusCreated from "../events/course-campus-created-event";
import CourseCreated from "../events/course-created-event";


const events = {
    CourseCreated,
    CourseCampusCreated
}

export namespace CourseEvents {
    export const CourseCreated = events.CourseCreated;
    export const CourseCampusCreated = events.CourseCampusCreated;
}