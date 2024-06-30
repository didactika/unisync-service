import BaseModel from "../../../db/models/base-model";
import { InitializeParams } from "../../../db/types/models/initialize-params";
import { InstalledComponentAttributes } from "../../types/db/models/installed-component";
import installedComponentSchema from "../schemas/installed-component-schema";

class InstalledComponentModel extends BaseModel<InstalledComponentAttributes> {
  public static initialize(params: InitializeParams) {
    InstalledComponentModel.init(installedComponentSchema, {
      ...params,
      tableName: "installed_components",
    });
  }
}

export default InstalledComponentModel;
