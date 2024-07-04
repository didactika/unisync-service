import CourseCreated from "../../../modules/course/events/course-created-event";
import CampusCreated from "../events/campus-created-event";

const events = {
    CampusCreated,
    CourseCreated
}

export namespace Events {
    export const CampusCreated = events.CampusCreated;
    export const CourseCreated = events.CourseCreated;
}