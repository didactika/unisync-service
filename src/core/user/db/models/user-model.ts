import { UserAttributes, UserCreationAttributes } from "../../types/db/models/user";
import BaseModel from "../../../db/models/base-model";

import userSchema from "../schemas/user-schema";

class UserModel extends BaseModel<UserAttributes, UserCreationAttributes> {
  public static initialize() {
    UserModel.init(userSchema, {
      sequelize: this._sequelize,
      tableName: "user",
    });
  }
}

export default UserModel;
