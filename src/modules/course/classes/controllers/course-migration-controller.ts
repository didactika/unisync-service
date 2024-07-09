import { EMigrationStatus } from "../../../../core/enums/migration-status-enum";
import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import RabbitMQPublisher from "../../../../core/events/message-broker/classes/rabbitmq/publisher/publisher";
import { ECourseType } from "../../enums/course-type-enum";
import CourseMigrationFinish from "../../events/course-migration-finish-event";
import CourseMigrationInformationUpdated from "../../events/course-migration-information-updated-event";
import { ICourseMigrationInformation } from "../../types/classes/entities/course-migration-information-types";
import { CourseMigrationCreatedEventData } from "../../types/events/internal/course-migration-created";
import { CourseBaseCreatedEvent } from "../../types/events/message-broker/course-base-created";
import CourseMigrationInformation from "../entities/course-migration-information";
import CourseController from "./course-controller";
import AcademicConfigJSON from "./../../statics/subject-versions.json";

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
  public static async createMigrationCourse(
    courseMigrationInfo: CourseMigrationCreatedEventData
  ): Promise<ICourseMigrationInformation> {
    if (!courseMigrationInfo.courseOriginId || !courseMigrationInfo.campusOriginId) {
      throw new Error("Missing required fields");
    }
    //TODO: include template logic and target logic
    const courseOrigin = await CourseController.getCourse(courseMigrationInfo.courseOriginId);
    if (!courseOrigin) {
      throw new Error("Course not found");
    }
    const academicConfigData = AcademicConfigJSON.find(
      (config) => config.name.toLowerCase() === courseOrigin.shortname.toLowerCase()
    );
    let idnumber: string = "";
    if (!academicConfigData) {
      idnumber = courseOrigin.idnumber!;
    } else {
      idnumber = academicConfigData.uuid + "||" + academicConfigData.name;
    }
    const newCourse = await CourseController.create({
      ...courseOrigin,
      idnumber,
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

  public static async migrationExists(migrationId: number): Promise<boolean> {
    const migrationCourse = await CourseMigrationInformation.findOne({ id: migrationId });
    return !!migrationCourse;
  }

  public static async getMigrationCourse(courseId: number): Promise<CourseMigrationInformation | null> {
    return await CourseMigrationInformation.findOne({ courseId });
  }

  public static async finishMigration(migrationId: number): Promise<void> {
    if (!(await this.migrationExists(migrationId))) {
      throw new Error("Migration course not found");
    }
    const courseMigrationFound = (await CourseMigrationInformation.findOne({
      id: migrationId,
    })) as ICourseMigrationInformation;
    if (courseMigrationFound.status !== EMigrationStatus.PENDING) throw new Error("Migration not is pending");
    const newCourseMigration = new CourseMigrationInformation(courseMigrationFound);
    newCourseMigration.status = EMigrationStatus.INPROGRESS;

    await newCourseMigration.update();
    BaseEventEmitter.emitEvent(
      new CourseMigrationFinish({
        migrationId,
        courseId: newCourseMigration.courseId!,
      })
    );
  }

  public static async finishMigrationCourse(courseId: number): Promise<void> {
    const courseMigration = await CourseMigrationController.getMigrationCourse(courseId);
    if (!courseMigration) {
      throw new Error("Migration course not found");
    }
    const courseData = await CourseController.getCourse(courseId);
    if (!courseData) {
      throw new Error("Course not found");
    }
    const payload: CourseBaseCreatedEvent = {
      data: {
        uuid: courseMigration.uuid!,
        header: {
          general: {
            category: 2,
            shortname: courseData.shortname,
            fullname: courseData.fullname,
            idnumber: courseData.idnumber,
          },
        },
      },
    };
    await RabbitMQPublisher.publishData(payload, "course-base-created");
  }
}
