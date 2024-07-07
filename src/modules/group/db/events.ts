import GroupsCourseSynced from "../events/groups-course-synced";


const events = {
    GroupsCourseSynced,
}

export namespace GroupEvents {
    export type GroupsCourseSynced = typeof GroupsCourseSynced;
}