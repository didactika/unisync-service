import CampusModel from "../../../../core/campus/db/models/campus";
import BaseModel from "../../../../core/db/models/base-model";
import CategoryModel from "../../../../core/db/models/category-model";
import BaseEventEmitter from "../../../../core/events/classes/base-event-emiter";
import { CourseCampusAttributes, CourseCampusCreationAttributes } from "../../types/db/models/course-campus";
import { Events } from "../events";
import courseCampusSchema from "../schemas/course-campus-schema";
import CourseModel from "./course-model";

class CourseCampusModel extends BaseModel<CourseCampusAttributes, CourseCampusCreationAttributes> {
  protected static requiredModels = [CourseModel, CampusModel, CategoryModel];
  public static initialize() {
    CourseCampusModel.init(courseCampusSchema, {
      sequelize: this._sequelize,
      tableName: "course_campus",
    });
  }

  protected static associate() {
    CourseCampusModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
    CourseCampusModel.belongsTo(CampusModel, {
      foreignKey: "campusId",
      as: "campus",
    });
    CourseCampusModel.belongsTo(CategoryModel, {
      foreignKey: "categoryId",
      as: "category",
    });
  }

  protected static addHooks(): void {
    CourseCampusModel.afterCreate((courseCampus, options) => {
      BaseEventEmitter.emitEvent(
        new Events.CourseCampusCreated({
          id: courseCampus.dataValues.id,
          campusId: courseCampus.dataValues.campusId,
          courseId: courseCampus.dataValues.courseId,
          categoryId: courseCampus.dataValues.categoryId,
          idOnCampus: courseCampus.dataValues.idOnCampus,
        })
      );
    });
  }
}

export default CourseCampusModel;
