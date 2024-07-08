import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import Campus from "../../../../core/campus/classes/entities/campus";
import { NCampusConnectorCourse } from "../../../../core/campus/types/classes/campus-connector/campus-connector-course";
import { ICampus } from "../../../../core/campus/types/classes/entities/campus-interface";
import CourseCampus from "../../../course/classes/entities/course-campus";
import { CourseCampusFindResponse } from "../../../course/types/classes/entities/course-campus-types";
import { IGroup } from "../../types/classes/entities/group-interface";
import Group from "../entities/group";
import GroupsCourseSynced from "../../events/groups-course-synced";
import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";

export default class GroupController {
  public static async syncFromCampus(courseId: number): Promise<IGroup[]> {
    const courseCampus = (await CourseCampus.findOne({ course: { id: courseId } })) as CourseCampusFindResponse;
    if (!courseCampus) return [];

    const campusCourseActions = new CampusConnectorCourse(courseCampus.campus);
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
      const groupinfo = {
        ...group,
        idOnCampus: group.id,
        courseId: courseCampus.courseId,
      };

      return groupFound ? this.update(groupFound, groupinfo) : this.create(courseId, groupinfo);
    });
    const syncedGroups = await Promise.all(groupPromises);
    const filteredGroups = syncedGroups.filter((group) => group !== null) as IGroup[];
    BaseEventEmitter.emitEvent(new GroupsCourseSynced({ courseId, groups: filteredGroups }));
    return filteredGroups;
  }

  public static async create(courseId: number, group: IGroup): Promise<IGroup> {
    const groupOnDB = new Group({
      courseId: courseId,
      idnumber: group.idnumber,
      name: group.name,
      idOnCampus: group.idOnCampus,
      description: group.description,
    });

    return await groupOnDB.create();
  }

  public static async update(groupFound: IGroup, newGroup: IGroup): Promise<IGroup> {
    const groupOnDB = new Group(groupFound);
    groupOnDB.idnumber = newGroup.idnumber;
    groupOnDB.name = newGroup.name;
    groupOnDB.idOnCampus = newGroup.idOnCampus;
    groupOnDB.description = newGroup.description;

    return await groupOnDB.update();
  }

  public static async getByCourse(courseId: number): Promise<IGroup[]> {
    return await Group.findMany({ courseId });
  }
}
