import { EUserRole } from "../../enums/user-role-enum";
import { IUser } from "../../types/classes/entities/user-interface";
import User from "../entities/user";
import PasswordHandler from "../utils/password-handler";

export default class UserController {
  public static async getAll(): Promise<IUser[]> {
    return (await User.findMany());
  }

  public static async create(user: IUser): Promise<Partial<IUser> | undefined> {
    if (await this.userExists(user.email, user.username)) return undefined;
    if (!this.validateRole(user.role)) return undefined;

    user.password = PasswordHandler.encryptPassword(user.password);
    const newUser = new User(user);
    const userCreated = await newUser.create();
    return {
      ...userCreated,
      id: undefined,
      password: undefined,
    };
  }

  public static async userExists(email: string, username: string): Promise<boolean> {
    return (await User.findOne<IUser>({ email })) !== null || (await User.findOne<IUser>({ username })) !== null;
  }

  public static validateRole(role: string): boolean {
    return Object.values(EUserRole).includes(role as EUserRole);
  }
}
