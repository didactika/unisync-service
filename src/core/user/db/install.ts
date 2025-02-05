import environment from "../../../config/environment";
import User from "../classes/controllers/user-controller";
import { EUserRole } from "../enums/user-role-enum";

/**
 * This function is used to install the user module database tables
 * @returns {void}
 */
const execute = async (): Promise<void> => {
  await User.create({
    firstName: environment.admin.ADMIN_FIRSTNAME,
    lastName: environment.admin.ADMIN_LASTNAME,
    username: environment.admin.ADMIN_USERNAME,
    email: environment.admin.ADMIN_EMAIL,
    password: environment.admin.ADMIN_PASSWORD,
    role: EUserRole.ADMIN,
  });
};

export default { execute };
