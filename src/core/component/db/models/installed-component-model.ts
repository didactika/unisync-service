import BaseModel from "../../../db/models/base-model";
import { InstalledComponentAttributes } from "../../types/db/models/installed-component";
import installedComponentSchema from "../schemas/installed-component-schema";

class InstalledComponentModel extends BaseModel<InstalledComponentAttributes> {
  public static initialize() {
    InstalledComponentModel.init(installedComponentSchema, {
      sequelize: this._sequelize,
      tableName: "installed_components",
    });
  }
}

export default InstalledComponentModel;
