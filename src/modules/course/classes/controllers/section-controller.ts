import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import Campus from "../../../../core/campus/classes/entities/campus";
import { NCampusConnectorCourse } from "../../../../core/campus/types/classes/campus-connector/campus-connector-course";
import { ICampus } from "../../../../core/campus/types/classes/entities/campus-interface";
import { ICourseCampus } from "../../types/classes/entities/course-campus-interface";
import { ISection } from "../../types/classes/entities/section-interface";
import CourseCampus from "../entities/course-campus";
import Section from "../entities/section";

export default class SectionController {
  public static async syncFromCampus(courseId: number): Promise<ISection[]> {
    const courseCampus = (await CourseCampus.findOne({ course: { id: courseId } })) as ICourseCampus;
    if (!courseCampus) return [];
    //TODO: Implement Type for courseCampus find response aand not use campus find.
    const campus = (await Campus.findOne({ id: courseCampus.campusId })) as ICampus;
    if (!campus) return [];

    const campusCourseActions = new CampusConnectorCourse(campus);
    const courseContent = await campusCourseActions.getCourseInformation({
      courseid: courseCampus.idOnCampus,
      includes: { header: 0, content: 1, groups: 0, groupings: 0 },
    });

    if (!courseContent.content) return [];

    const sectionPromises: Promise<ISection | null>[] = courseContent.content.sections.map(async (section) => {
      if (!section) return null;

      const sectionFound = (await Section.findOne({
        courseId: courseCampus.courseId,
        position: section.section,
      })) as ISection;

      return sectionFound ? this.update(sectionFound, section) : this.create(courseId, section);
    });
    const syncedSections = await Promise.all(sectionPromises);
    return syncedSections.filter((section) => section !== null) as ISection[];
  }

  private static async create(courseId: number, section: NCampusConnectorCourse.Section): Promise<ISection> {
    const sectionOnDB = new Section({
      courseId: courseId,
      name: section.name,
      position: section.section,
      visible: section.visible === 1 ? true : false,
      availability: section.availability,
    });

    return await sectionOnDB.create();
  }

  private static async update(sectionFound: ISection, newSection: NCampusConnectorCourse.Section): Promise<ISection> {
    const sectionOnDB = new Section(sectionFound);
    sectionOnDB.name = newSection.name;
    sectionOnDB.position = newSection.section;
    sectionOnDB.visible = newSection.visible === 1 ? true : false;
    sectionOnDB.availability = newSection.availability;

    return await sectionOnDB.update();
  }
}
