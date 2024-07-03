import CampusModel from "../../../../core/campus/db/models/campus";
import BaseModel from "../../../../core/db/models/base-model";
import { InitializeParams } from "../../../../core/db/types/models/initialize-params";
import { CourseMigrationInformationAttributes, CourseMigrationInformationCreationAttributes } from "../../types/db/models/course-migration-information";
import courseMigrationInformationSchema from "../schemas/course-migration-information-schema";
import CourseModel from "./course-model";

class CourseMigrationInformationModel extends BaseModel<CourseMigrationInformationAttributes, CourseMigrationInformationCreationAttributes> {
  public static initialize(params: InitializeParams) {
    CourseMigrationInformationModel.init(courseMigrationInformationSchema, {
      tableName: "course_migration_information",
      ...params,
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

    protected static initializeRequiredModels(params: InitializeParams) {
        CourseModel.initialize({
            ...params,
            componentType: "course",
        });
        CampusModel.initialize({
            ...params,
            componentType: "campus",
        });
    }
}

export default CourseMigrationInformationModel;
