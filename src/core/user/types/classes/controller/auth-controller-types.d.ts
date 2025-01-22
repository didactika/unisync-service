import { EUserRole } from "../../../enums/user-role-enum";

export type LoginInfo = {
  username?: string;
  email?: string;
  password: string;
};

export type SessionData = {
  user: IUser;
  sessionToken: string;
};

export type TokenSessionData = {
  userUuid: uuid,
  username: string,
  role: EUserRole,
  exp?: number,
  iat?: number
};