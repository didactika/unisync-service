import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import { ECourseType } from "../../enums/course-type-enum";
import CourseMigrationInformationUpdated from "../../events/course-migration-information-updated-event";
import { ICourseMigrationInformation } from "../../types/classes/entities/course-migration-information-types";
import { CourseMigrationCreatedEventData } from "../../types/events/internal/course-migration-created";
import CourseMigrationInformation from "../entities/course-migration-information";
import CourseController from "./course-controller";

export default class CourseMigrationController {
  public static async createMigrationInformation(
    courseMigrationData: ICourseMigrationInformation
  ): Promise<ICourseMigrationInformation> {
    if (
      !courseMigrationData.courseOriginId ||
      !courseMigrationData.campusOriginId ||
      !courseMigrationData.campusTargetId
    ) {
      throw new Error("Missing required fields");
    }

    const newCourseMigration = await new CourseMigrationInformation(courseMigrationData).create();
    return await this.createMigrationCourse(newCourseMigration);
  }

  //TODO: Refactor this method
  public static async createMigrationCourse(courseMigrationInfo: CourseMigrationCreatedEventData): Promise<ICourseMigrationInformation> {
    if (!courseMigrationInfo.courseOriginId || !courseMigrationInfo.campusOriginId) {
      throw new Error("Missing required fields");
    }
    //TODO: include template logic and target logic
    const courseOrigin = await CourseController.getCourse(courseMigrationInfo.courseOriginId);
    if (!courseOrigin) {
      throw new Error("Course not found");
    }

    const newCourse = await CourseController.create({
      ...courseOrigin,
      type: ECourseType.MIGRATION,
      uuid: undefined,
      id: undefined,
    });
    const courseMigrationData = new CourseMigrationInformation(courseMigrationInfo);
    courseMigrationData.courseId = newCourse.id;
    const response = await courseMigrationData.update();
    BaseEventEmitter.emitEvent(
      new CourseMigrationInformationUpdated({
        newData: courseMigrationData,
      })
    );
    return response;
  }

  public static async getMigrationCourse(courseId: number): Promise<CourseMigrationInformation | null> {
    return await CourseMigrationInformation.findOne({ courseId });
  }
}
