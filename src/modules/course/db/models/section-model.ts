import BaseModel from "../../../../core/db/models/base-model";
import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import { SectionAttributes, SectionCreationAttributes } from "../../types/db/models/section";
import { CourseEvents } from "../events";
import sectionSchema from "../schemas/section-schema";
import CourseModel from "./course-model";

class SectionModel extends BaseModel<SectionAttributes, SectionCreationAttributes> {
  protected static requiredModels = [CourseModel];
  public static initialize() {
    SectionModel.init(sectionSchema, {
      sequelize: this._sequelize,
      tableName: "section",
    });
  }

  protected static associate() {
    SectionModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
  }

  protected static addHooks(): void {
    SectionModel.afterCreate((section) => {
        BaseEventEmitter.emitEvent(
          new CourseEvents.SectionCreated({
            id: section.dataValues.id,
            courseId: section.dataValues.courseId,
            name: section.dataValues.name,
            position: section.dataValues.position,
            visible: section.dataValues.visible,
            availability: section.dataValues.availability,
          })
        );
      });
    }
}

export default SectionModel;
