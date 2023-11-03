
/**
 * @namespace CourseSkeletonTypes
 * @description The course skeleton types
 */
export namespace CourseSkeletonTypes {

    /**
     * @type CourseSkeleton
     * @description The course skeleton
     */
    type CourseSkeleton = {
        header: HeaderTypes.Header;
        sections: SectionTypes.Section[];
        groups: GroupTypes.Group[];
    }

    /**
     * @namespace HeaderTypes
     * @description The header types
     * @memberof CourseSkeletonTypes
     */
    namespace HeaderTypes {
        /**
        * @type Header
        * @description The course header
        */
        type Header = {
            general: General;
        }

        /**
        * @type General
        */
        type General = {
            id: number;
            fullname: string;
            shortname: string;
            categoryid: number;
            idnumber?: string;
        }
    }

    /**
     * @namespace SectionTypes
     * @description The section types
     * @memberof CourseSkeletonTypes
     */
    namespace SectionTypes {
        /**
         * @type Section
         * @description The course section
         */
        type Section = {
            name: string | null;
            availability: string; //TODO: Create a type for this in the future
            mods: Mod[];
        }

        /**
         * @type Mod
         * @description The course mod
         */
        type Mod = AssignMod | ForumMod | QuizMod | URLMod;

        /**
         * @type AssignMod
         * @description The course assign mod
         */
        type AssignMod = {
            modtype: "assign";
            header: {
                general: {
                    name: string;
                    grade: string;
                };
                availability: {
                    duedate: string;
                    cutoffdate: string;
                };
            };
        };

        /**
         * @type ForumMod
         * @description The course forum mod
         */
        type ForumMod = {
            modtype: "forum";
            header: {
                general: {
                    name: string;
                };
            };
        };

        /**
         * @type QuizMod
         * @description The course quiz mod
         */
        type QuizMod = {
            modtype: "quiz";
            header: {
                general: {
                    name: string;
                };
            };
            questions: any[];
        };

        /**
         * @type URLMod
         * @description The course url mod
         */
        type URLMod = {
            modtype: "url";
            header: {
                general: {
                    name: string;
                    url: string;
                    description: string;
                };
            };
        };

    }

    /**
     * @namespace GroupTypes
     * @description The group types
     * @memberof CourseSkeletonTypes
     */
    namespace GroupTypes {
        /**
         * @type Group
         * @description The course group
         */
        type Group = {
            header: HeaderTypes.Header;
        }

        /**
         * @namespace HeaderTypes
         * @description The header types
         * @memberof GroupTypes
         */
        namespace HeaderTypes {
            /**
             * @type Header
             * @description The course group header
             */
            type Header = {
                general: General;
            }

            /**
             * @type General
             */
            type General = {
                name: string;
                identifier: string;
            }
        }
    }
}