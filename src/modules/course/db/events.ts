import CourseCampusCreated from "../events/course-campus-created-event";
import CourseCreated from "../events/course-created-event";
import CourseMigrationInformationUpdated from "../events/course-migration-information-updated-event";


const events = {
    CourseCreated,
    CourseCampusCreated,
    CourseMigrationInformationUpdated
}

export namespace CourseEvents {
    export const CourseCreated = events.CourseCreated;
    export const CourseCampusCreated = events.CourseCampusCreated;
    export const CourseMigrationInformationUpdated = events.CourseMigrationInformationUpdated;
}