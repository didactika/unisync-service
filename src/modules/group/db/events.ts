import GroupsCourseMigrationCreated from "../events/groups-course-migration-created";
import GroupsCourseSynced from "../events/groups-course-synced";
export namespace GroupEvents {
    export type GroupsCourseSynced = typeof GroupsCourseSynced;
    export type GroupsCourseMigrationCreated = typeof GroupsCourseMigrationCreated;
}