import { Sequelize } from "sequelize";
import BaseModel from "../../../../core/db/models/base-model";
import { CourseAttributes, CourseCreationAttributes } from "../../types/db/models/course";
import courseSchema from "../schemas/course-schema";
import BaseEventEmitter from "../../../../core/events/classes/base-event-emiter";
import { Events } from "../../../../core/campus/db/events";

class CourseModel extends BaseModel<CourseAttributes, CourseCreationAttributes> {
  public static initialize() {
    CourseModel.init(courseSchema, {
      sequelize: this._sequelize,
      tableName: "course",
    });
  }
  protected static addHooks(): void {
    CourseModel.afterCreate((course, options) => {
      BaseEventEmitter.emitEvent(
        new Events.CourseCreated({
          uuid: course.dataValues.uuid,
          type: course.dataValues.type,
          fullname: course.dataValues.fullname,
          shortname: course.dataValues.shortname,
          idnumber: course.dataValues.idnumber,
        })
      );
    });
  }
}

export default CourseModel;
