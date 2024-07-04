import BaseModel from "../../../db/models/base-model";
import { CampusAttributes, CampusCreationAttributes } from "../../types/db/campus";
import campusSchema from "../schemas/campus-schema";

class CampusModel extends BaseModel<CampusAttributes, CampusCreationAttributes> {
  static initialize(): void {
    CampusModel.init(campusSchema, {
      sequelize: this._sequelize,
      tableName: "campus",
    });
  }
}

export default CampusModel;
