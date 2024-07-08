export namespace NCampusConnectorCourse {
  type IncludesInformation = {
    header: number = 0;
    content: number = 0;
    groups: number = 0;
    groupings: number = 0;
  };

  export type GetCourseInformationRequest = {
    courseid: number;
    includes: IncludesInformation;
  };

  export type GeneralInfo = {
    category: number; // category
    fullname: string; // fullname
    shortname: string; // shortname
    idnumber: string; // idnumber
  };

  export type Header = {
    general?: GeneralInfo; // general
  };

  export type Section = {
    id: number; // id
    section: number; // section
    name: string; // name
    visible: number; // visible
    availability: string; // availability
  };

  export type Content = {
    sections: Section[]; // sections
  };

  export type Group = {
    id: number; // group ID
    name: string; // group name
    idnumber: string; // group idnumber
    description: string; // group description
  };

  export type Grouping = {
    id: number; // grouping ID
    idnumber: string; // grouping idnumber
    name: string; // grouping name
    description: string; // grouping description
    groups: number[]; // group ID
  };

  export type GetCourseInformationResponse = {
    courseid: number; // course ID
    header?: Header; // header
    content?: Content; // content
    groups?: Group[]; // groups
    groupings?: Grouping[]; // groupings
  };

  export type CourseFormatOption = {
    name: string; // course format option name
    value: string; // course format option value
  };

  export type CustomField = {
    name: string; // The name of the custom field
    shortname: string; // The shortname of the custom field
    type: string; // The type of the custom field - text, checkbox...
    valueraw: string; // The raw value of the custom field
    value: string; // The value of the custom field
  };

  export type GetCourseResponse = {
    id: number; // course id
    shortname: string; // course short name
    categoryid: number; // category id
    categorysortorder?: number; // sort order into the category
    fullname: string; // full name
    displayname: string; // course display name
    idnumber?: string; // id number
    summary: string; // summary
    summaryformat: number; // summary format (1 = HTML, 0 = MOODLE, 2 = PLAIN or 4 = MARKDOWN)
    format: string; // course format: weeks, topics, social, site,..
    showgrades?: number; // 1 if grades are shown, otherwise 0
    newsitems?: number; // number of recent items appearing on the course page
    startdate: number; // timestamp when the course starts
    enddate: number; // timestamp when the course ends
    numsections?: number; // (deprecated, use courseformatoptions) number of weeks/topics
    maxbytes?: number; // largest size of file that can be uploaded into the course
    showreports?: number; // are activity reports shown (yes = 1, no = 0)
    visible?: number; // 1: available to student, 0: not available
    hiddensections?: number; // (deprecated, use courseformatoptions) How the hidden sections in the course are displayed to students
    groupmode?: number; // no group, separate, visible
    groupmodeforce?: number; // 1: yes, 0: no
    defaultgroupingid?: number; // default grouping id
    timecreated?: number; // timestamp when the course was created
    timemodified?: number; // timestamp when the course was modified
    enablecompletion?: number; // Enabled, control via completion and activity settings. Disabled, not shown in activity settings.
    completionnotify?: number; // 1: yes, 0: no
    lang?: string; // forced course language
    forcetheme?: string; // name of the forced theme
    courseformatoptions?: Array<CourseFormatOption>; // additional options for particular course format
    showactivitydates: number; // Whether the activity dates are shown or not
    showcompletionconditions: number; // Whether the activity completion conditions are shown or not
    customfields?: Array<CustomField>; // Custom fields and associated values
  };
}
