import CampusModel from "../../../../core/campus/db/models/campus";
import BaseModel from "../../../../core/db/models/base-model";
import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import {
  CourseMigrationInformationAttributes,
  CourseMigrationInformationCreationAttributes,
} from "../../types/db/models/course-migration-information";
import { CourseEvents } from "../events";
import courseMigrationInformationSchema from "../schemas/course-migration-information-schema";
import CourseModel from "./course-model";

class CourseMigrationInformationModel extends BaseModel<
  CourseMigrationInformationAttributes,
  CourseMigrationInformationCreationAttributes
> {
  protected static requiredModels = [CourseModel, CampusModel];

  public static initialize() {
    CourseMigrationInformationModel.init(courseMigrationInformationSchema, {
      sequelize: this._sequelize,
      tableName: "course_migration_information",
    });
  }

  protected static associate() {
    CourseMigrationInformationModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
    CourseMigrationInformationModel.belongsTo(CourseModel, {
      foreignKey: "courseOriginId",
      as: "courseOrigin",
    });
    CourseMigrationInformationModel.belongsTo(CourseModel, {
      foreignKey: "courseTargetId",
      as: "courseTarget",
    });
    CourseMigrationInformationModel.belongsTo(CourseModel, {
      foreignKey: "courseTemplateId",
      as: "courseTemplate",
    });
    CourseMigrationInformationModel.belongsTo(CampusModel, {
      foreignKey: "campusOriginId",
      as: "campusOrigin",
    });
    CourseMigrationInformationModel.belongsTo(CampusModel, {
      foreignKey: "campusTargetId",
      as: "campusTarget",
    });
  }
}

export default CourseMigrationInformationModel;
