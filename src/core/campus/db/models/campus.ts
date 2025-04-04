import BaseModel from "../../../db/models/base-model";
import BaseEventEmitter from "../../../events/internal/base-event-emiter";
import { CampusAttributes, CampusCreationAttributes } from "../../types/db/campus";
import { CampusEvents } from "../events";
import campusSchema from "../schemas/campus-schema";

class CampusModel extends BaseModel<CampusAttributes, CampusCreationAttributes> {
  static initialize(): void {
    CampusModel.init(campusSchema, {
      sequelize: this._sequelize,
      tableName: "campus",
    });
  }

  protected static addHooks(): void {
    CampusModel.afterCreate((campus, options) => {
      BaseEventEmitter.emitEvent(
        new CampusEvents.CampusCreated({
          id: campus.dataValues.id,
          name: campus.dataValues.name,
          url: campus.dataValues.url,
          token: campus.dataValues.token,
          version: campus.dataValues.version,
        })
      );
    });
  }
}

export default CampusModel;
