import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import Campus from "../../../../core/campus/classes/entities/campus";
import { NCampusConnectorCourse } from "../../../../core/campus/types/classes/campus-connector/campus-connector-course";
import { ICampus } from "../../../../core/campus/types/classes/entities/campus-interface";
import CourseCampus from "../../../course/classes/entities/course-campus";
import { ICourseCampus } from "../../../course/types/classes/entities/course-campus-interface";
import { IGrouping } from "../../types/classes/entities/grouping-interface";
import Grouping from "../entities/grouping";
import GroupingGroup from "../entities/grouping-groups";

export default class GroupingController {
  static async syncFromCampus(courseId: number): Promise<IGrouping[]> {
    const courseCampus = (await CourseCampus.findOne({ course: { id: courseId } })) as ICourseCampus;
    if (!courseCampus) return [];
    //TODO: Implement Type for courseCampus find response aand not use campus find.
    const campus = (await Campus.findOne({ id: courseCampus.campusId })) as ICampus;
    if (!campus) return [];

    const campusCourseActions = new CampusConnectorCourse(campus);
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

      return groupingFound ? this.update(groupingFound, grouping) : this.create(courseId, grouping);
    });
    const syncedGroupings = await Promise.all(gropingPromises);
    const filteredGroups = syncedGroupings.filter((group) => group !== null) as IGrouping[];
    return filteredGroups;
  }

  private static async create(courseId: number, grouping: NCampusConnectorCourse.Grouping): Promise<IGrouping> {
    const groupingOnDB = new Grouping({
      courseId: courseId,
      idnumber: undefined, // TODO: Change this
      name: grouping.name,
      idOnCampus: grouping.id,
    });

    const groupingCreated = await groupingOnDB.create();

    const groupingGroupFound = (await GroupingGroup.findOne({
      courseId: courseId,
      idOnCampus: grouping.id,
    })) as IGrouping;

    if (!groupingGroupFound) {
      const groupingGroup = new GroupingGroup({
        groupId: grouping.id,
        groupingId: groupingCreated.id!,
      });

      await groupingGroup.create();
    }
    return groupingCreated;
  }

  private static async update(groupingFound: IGrouping, newGrouping: NCampusConnectorCourse.Grouping): Promise<IGrouping> {
    const groupingOnDB = new Grouping(groupingFound);
    groupingOnDB.idnumber = undefined;    // TODO: Change this
    groupingOnDB.name = newGrouping.name;
    groupingOnDB.idOnCampus = newGrouping.id;

    return await groupingOnDB.update();
  }
}
