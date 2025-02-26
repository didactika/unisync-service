import CourseCampusCreated from "../events/course-campus-created-event";
import CourseCreated from "../events/course-created-event";
import CourseMigrationFinish from "../events/course-migration-finish-event";
import CourseMigrationInformationUpdated from "../events/course-migration-information-updated-event";
import SectionCreated from "../events/section-created.event";


const events = {
    CourseCreated,
    CourseCampusCreated,
    CourseMigrationInformationUpdated,
    CourseMigrationFinish,
    SectionCreated
}

export namespace CourseEvents {
    export const CourseCreated = events.CourseCreated;
    export const CourseCampusCreated = events.CourseCampusCreated;
    export const CourseMigrationInformationUpdated = events.CourseMigrationInformationUpdated;
    export const CourseMigrationFinish = events.CourseMigrationFinish;
    export const SectionCreated = events.SectionCreated;
}