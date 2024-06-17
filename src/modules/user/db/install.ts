import environment from "../../../config/environment";
import User from "../classes/user";
import UserModel from "./models/user-model";

/**
 * This function is used to install the user module database tables
 * @returns {void}
 */
const execute = async (): Promise<void> => {
  // await new User({
  //     firstName: environment.admin.ADMIN_FIRSTNAME,
  //     lastName: environment.admin.ADMIN_LASTNAME,
  //     email: environment.admin.ADMIN_EMAIL,
  //     role: "admin",
  //     username: environment.admin.ADMIN_USERNAME,
  //     password: environment.admin.ADMIN_PASSWORD,
  // }).create();
};

export default { execute };
