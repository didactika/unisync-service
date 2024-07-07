import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import Campus from "../../../../core/campus/classes/entities/campus";
import { NCampusConnectorCourse } from "../../../../core/campus/types/classes/campus-connector/campus-connector-course";
import { ICampus } from "../../../../core/campus/types/classes/entities/campus-interface";
import BaseEventEmitter from "../../../../core/events/base-event-emiter";
import CourseCampus from "../../../course/classes/entities/course-campus";
import { ICourseCampus } from "../../../course/types/classes/entities/course-campus-interface";
import { IGroup } from "../../types/classes/entities/group-interface";
import Group from "../entities/group";
import GroupsCourseSynced from "../../events/groups-course-synced";

export default class GroupController {
  public static async syncFromCampus(courseId: number): Promise<IGroup[]> {
    const courseCampus = (await CourseCampus.findOne({ course: { id: courseId } })) as ICourseCampus;
    if (!courseCampus) return [];
    //TODO: Implement Type for courseCampus find response aand not use campus find.
    const campus = (await Campus.findOne({ id: courseCampus.campusId })) as ICampus;
    if (!campus) return [];

    const campusCourseActions = new CampusConnectorCourse(campus);
    const courseContent = await campusCourseActions.getCourseInformation({
      courseid: courseCampus.idOnCampus,
      includes: { header: 0, content: 0, groups: 1, groupings: 0 },
    });

    if (!courseContent.groups || courseContent.groups.length == 0) return [];

    const groupPromises: Promise<IGroup | null>[] = courseContent.groups.map(async (group) => {
      if (!group) return null;

      const groupFound = (await Group.findOne({
        courseId: courseCampus.courseId,
        idOnCampus: group.id,
      })) as IGroup;

      return groupFound ? this.update(groupFound, group) : this.create(courseId, group);
    });
    const syncedGroups = await Promise.all(groupPromises);
    const filteredGroups = syncedGroups.filter((group) => group !== null) as IGroup[];
    BaseEventEmitter.emitEvent(new GroupsCourseSynced({ courseId, groups: filteredGroups }));
    return filteredGroups;
  }

  private static async create(courseId: number, group: NCampusConnectorCourse.Group): Promise<IGroup> {
    const groupOnDB = new Group({
      courseId: courseId,
      idnumber: group.idnumber,
      name: group.name,
      idOnCampus: group.id,
      description: group.description,
    });

    return await groupOnDB.create();
  }

  private static async update(groupFound: IGroup, newGroup: NCampusConnectorCourse.Group): Promise<IGroup> {
    const groupOnDB = new Group(groupFound);
    groupOnDB.idnumber = newGroup.idnumber;
    groupOnDB.name = newGroup.name;
    groupOnDB.idOnCampus = newGroup.id;
    groupOnDB.description = newGroup.description;

    return await groupOnDB.update();
  }
}
