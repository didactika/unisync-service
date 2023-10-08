import IUser from "../../interfaces/models-interfaces/user-interfaces";
import models from "../../../database/models/models";
import { UserFilter, UserFormatedResponse } from "../../types/models-classes-types/user-class-types";

/**
 * @class User
 * @implements {IUser}
 */
export default class User implements IUser {
    public readonly id?: string;
    public readonly uuid?: string;
    private _username: string;
    private _email: string;
    private _password: string;
    public readonly createdAt?: Date;

    /**
     * Define the user model
     * @constructor
     * @param {IUser} user User model
     */
    constructor(user: IUser) {
        this.id = user.id;
        this.uuid = user.uuid;
        this._username = user.username;
        this._email = user.email;
        this._password = user.password;
        this.createdAt = user.createdAt;
    }

    /**
     * @Getters
     */
    public get username(): string {
        return this._username;
    }
    public get email(): string {
        return this._email;
    }
    public get password(): string {
        return this._password;
    }

    /**
     * @Setters
     */
    public set username(username: string) {
        this._username = username;
    }
    public set email(email: string) {
        this._email = email;
    }
    public set password(password: string) {
        this._password = password;
    }

    /**
     * Create a new user
     * @param {IUser} user 
     */
    public async Create(): Promise<void> {
        await models.user.create({
            username: this._username,
            email: this._email,
            password: this._password
        });
    }

    /**
   * @method GetFormatReadResponse
   * @description Format the response of the read methods
   * @param user user to be formatted
   * @returns Formatted user
   * @memberof User
   */
  private static GetFormatReadResponse(user: IUser): UserFormatedResponse {
    return {
        id: user.id,
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt
    }
  }
    
    /**
   * @method ReadOneByFilter
   * @description Read one user by filter
   * @param filter Filter to be used
   * @returns user found
   * @memberof User
   */
  public static async ReadOneByFilter(
    filter: UserFilter
  ): Promise<UserFormatedResponse | null> {
    console.log(filter);
    
    const userFound = await models.user.findOne(filter) as IUser;
    return userFound
      ? this.GetFormatReadResponse(userFound)
      : null;
  }

  /**
   * @method ReadByFilter
   * @description Read some users by filter
   * @param filter Filter to be used
   * @returns Users found
   * @memberof User
   */
  public static async ReadByFilter(filter: UserFilter): Promise<UserFormatedResponse[]> {
    const usersFound = await models.user.find(filter) as IUser[];
    return usersFound.map(user => this.GetFormatReadResponse(user));
  }

  /**
   * @method ReadAll
   * @description Read all users
   * @returns Users found
   * @memberof User
   */
  public static async ReadAll(): Promise<UserFormatedResponse[]> {
    const usersFound = await models.user.find() as IUser[];
    return usersFound.map(user => this.GetFormatReadResponse(user));
  }
}