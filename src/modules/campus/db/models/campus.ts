import BaseModel from "../../../../db/models/base-model";
import { CampusAttributes, CampusCreationAttributes } from "../../types/db/campus";
import { InitializeParams } from "../../../../types/db/models/initialize-params";
import campusSchema from "../schemas/campus-schema";

class CampusModel extends BaseModel<CampusAttributes, CampusCreationAttributes> {
  static initialize(params: InitializeParams): void {
    CampusModel.init(campusSchema, {
      tableName: "campus",
      ...params,
    });
  }
}

export default CampusModel;
