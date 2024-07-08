import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import { NCampusConnectorCourse } from "../../../../core/campus/types/classes/campus-connector/campus-connector-course";
import CourseCampus from "../../../course/classes/entities/course-campus";
import { CourseCampusFindResponse } from "../../../course/types/classes/entities/course-campus-types";
import { IGrouping } from "../../types/classes/entities/grouping-interface";
import Grouping from "../entities/grouping";
import GroupingGroupController from "./grouping-group-controller";

export default class GroupingController {
  static async syncFromCampus(courseId: number): Promise<IGrouping[]> {
    const courseCampus = (await CourseCampus.findOne({ course: { id: courseId } })) as CourseCampusFindResponse;
    if (!courseCampus) return [];

    const campusCourseActions = new CampusConnectorCourse(courseCampus.campus);
    const courseContent = await campusCourseActions.getCourseInformation({
      courseid: courseCampus.idOnCampus,
      includes: { header: 0, content: 0, groups: 0, groupings: 1 },
    });

    if (!courseContent.groupings || courseContent.groupings.length == 0) return [];

    const gropingPromises: Promise<IGrouping | null>[] = courseContent.groupings.map(async (grouping) => {
      if (!grouping) return null;

      const groupingFound = (await Grouping.findOne({
        courseId: courseCampus.courseId,
        idOnCampus: grouping.id,
      })) as IGrouping;
      const groupinginfo = {
        ...grouping,
        idOnCampus: grouping.id,
        courseId: courseCampus.courseId,
        id: undefined,
      };
      const groupingSynced = groupingFound
        ? await this.update(groupingFound, groupinginfo)
        : await this.create(courseId, groupinginfo);
      GroupingGroupController.createFromCampus(groupingSynced, grouping.groups);
      return groupingSynced;
    });
    const syncedGroupings = await Promise.all(gropingPromises);
    const filteredGroups = syncedGroupings.filter((group) => group !== null) as IGrouping[];
    return filteredGroups;
  }

  public static async create(courseId: number, grouping: IGrouping): Promise<IGrouping> {
    const groupingOnDB = new Grouping({
      courseId: courseId,
      idnumber: grouping.idnumber,
      name: grouping.name,
      idOnCampus: grouping.idOnCampus,
    });

    return await groupingOnDB.create();
  }

  public static async update(groupingFound: IGrouping, newGrouping: IGrouping): Promise<IGrouping> {
    const groupingOnDB = new Grouping(groupingFound);
    groupingOnDB.idnumber = newGrouping.idnumber;
    groupingOnDB.name = newGrouping.name;
    groupingOnDB.idOnCampus = newGrouping.idOnCampus;

    return await groupingOnDB.update();
  }

  public static async getByCourse(courseId: number): Promise<IGrouping[]> {
    return await Grouping.findMany({ courseId });
  }
}
