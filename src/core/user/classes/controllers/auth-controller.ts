import { LoginInfo, SessionData, TokenSessionData } from "../../types/classes/controller/auth-controller-types";
import { IUser } from "../../types/classes/entities/user-interface";
import User from "../entities/user";
import JWT from "../utils/jwt";
import PasswordHandler from "../utils/password-handler";

export default class AuthController {
  public static async login(userData: LoginInfo): Promise<SessionData | undefined> {
    const loginUser = userData.email ? { email: userData.email } : { username: userData.username };
    const userFound = await User.findOne<IUser>(loginUser);
    if (!userFound) return undefined;
    const isPasswordValid = PasswordHandler.comparePasswords(userData.password, userFound.password);
    if (!isPasswordValid) return undefined;
    return {
      user: {
        ...userFound,
        password: undefined,
      },
      sessionToken: await this.createSession(userFound),
    };
  }

  private static async createSession(user: IUser): Promise<string> {
    const sessionData: TokenSessionData = {
      userUuid: user.uuid!,
      username: user.username,
      role: user.role,
    };

    return JWT.generateAccessToken(sessionData);
  }
}
