import ICourse from "../../interfaces/models-interfaces/course-interfaces";

/**
 * @name ECourseLanguage
 * @description The course language
 */
export enum ECourseLanguage {
    ENGLISH = "en",
    SPANISH = "es",
    FRENCH = "fr",
    PORTUGUESE = "pt",
    ITALIAN = "it"
}

/**
 * @name ECourseMigrationStatus
 * @description The course migration status
 */
export enum ECourseMigrationStatus {
    PENDING = "pending",
    INPROGRESS = "inprogress",
    COMPLETED = "completed"
}

/**
 * @type CourseStatus
 * @description The course status
 */
export type CourseStatus = {
    [K in ECourseLanguage]?: ECourseMigrationStatus;
};

/**
 * @type CourseFormatedResponse
 * @description The course formated response for the read methods
 */
export type CourseFormatedResponse = ICourse;

/**
 * @type CourseFilter
 * @description The course filter for the read methods
 */
export type CourseFilter = {
    id?: string;
    uuid?: string;
    fullname?: string;
    shortname?: string;
    campus?: string;
}