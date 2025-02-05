import BaseModel from "../../../../core/db/models/base-model";
import { CourseAttributes, CourseCreationAttributes } from "../../types/db/models/course";
import courseSchema from "../schemas/course-schema";
import { CourseEvents } from "../events";
import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";

class CourseModel extends BaseModel<CourseAttributes, CourseCreationAttributes> {
  public static initialize() {
    CourseModel.init(courseSchema, {
      sequelize: this._sequelize,
      tableName: "course",
    });
  }
  protected static addHooks(): void {
    CourseModel.afterCreate((course) => {
      BaseEventEmitter.emitEvent(
        new CourseEvents.CourseCreated({
          id: course.dataValues.id,
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
