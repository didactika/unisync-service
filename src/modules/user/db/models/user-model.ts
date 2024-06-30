import { UserAttributes, UserCreationAttributes } from "../../types/db/models/user";
import BaseModel from "../../../../core/db/models/base-model";
import { InitializeParams } from "../../../../core/db/types/models/initialize-params";
import userSchema from "../schemas/user-schema";

class UserModel extends BaseModel<UserAttributes, UserCreationAttributes> {
  public static initialize(params: InitializeParams) {
    UserModel.init(userSchema, {
      tableName: "users",
      ...params,
    });
  }
}

export default UserModel;
