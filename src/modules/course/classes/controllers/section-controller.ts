import CampusConnectorCourse from "../../../../core/campus/classes/campus-connector/campus-connector-course";
import { CourseCampusFindResponse } from "../../types/classes/entities/course-campus-types";
import { ISection } from "../../types/classes/entities/section-types";
import CourseCampus from "../entities/course-campus";
import Section from "../entities/section";

export default class SectionController {
  public static async syncFromCampus(courseId: number): Promise<ISection[]> {
    const courseCampus = (await CourseCampus.findOne({ course: { id: courseId } })) as CourseCampusFindResponse;
    if (!courseCampus) return [];

    const campusCourseActions = new CampusConnectorCourse(courseCampus.campus);
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
      const sectionData: ISection = {
        ...section,
        position: section.section,
        courseId: courseCampus.courseId,
        visible: section.visible === 1 ? true : false,
      }
      return sectionFound ? this.update(sectionFound, sectionData) : this.create(courseId, sectionData);
    });
    const syncedSections = await Promise.all(sectionPromises);
    return syncedSections.filter((section) => section !== null) as ISection[];
  }

  public static async create(courseId: number, section: ISection): Promise<ISection> {
    const sectionOnDB = new Section({
      courseId: courseId,
      name: section.name,
      position: section.position,
      visible: section.visible,
      availability: section.availability,
    });

    return await sectionOnDB.create();
  }

  public static async update(sectionFound: ISection, newSection: ISection): Promise<ISection> {
    const sectionOnDB = new Section(sectionFound);
    sectionOnDB.name = newSection.name;
    sectionOnDB.position = newSection.position;
    sectionOnDB.visible = newSection.visible;
    sectionOnDB.availability = newSection.availability;

    return await sectionOnDB.update();
  }

  public static async getSectionsByCourse(courseId: number): Promise<ISection[]> {
    return await Section.findMany({ courseId });
  }
}
