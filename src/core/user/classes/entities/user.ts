import BaseEntity from "../../../classes/entities/base-entity";
import UserModel from "../../db/models/user-model";
import { EUserRole } from "../../enums/user-role-enum";
import { UserFilter } from "../../types/classes/entities/user-filter";
import { IUser } from "../../types/classes/entities/user-interface";

class User extends BaseEntity<IUser> implements IUser {
  public readonly uuid: string | undefined;
  private _username: string;
  private _password: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _role: EUserRole;

  constructor(user: IUser) {
    super(user);
    this.uuid = user.uuid;
    this._username = user.username;
    this._password = user.password;
    this._firstName = user.firstName;
    this._lastName = user.lastName;
    this._email = user.email;
    this._role = user.role;
  }

  // Getters and setters
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get role(): EUserRole {
    return this._role;
  }

  set role(value: EUserRole) {
    this._role = value;
  }

  public toJSON(): IUser {
    return {
      id: this.id,
      uuid: this.uuid,
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Create a new user
   */
  public async create(): Promise<IUser> {
    return (
      await UserModel.create({
        uuid: this.uuid || undefined,
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.role,
      })
    ).dataValues as IUser;
  }

  public static async findMany<IUser>(filter?: UserFilter): Promise<IUser[]> {
    return (await UserModel.findAll(filter ? { where: filter } : {})).map((user) => user.get({ plain: true }) as IUser);
  }

  public static async findOne<IUser>(filter?: UserFilter): Promise<IUser | null> {
    const user = await UserModel.findOne(filter ? { where: filter } : {});
    return user ? (user.get({ plain: true }) as IUser) : null;
  }

  /**
   * Update an existing user
   */
  public async update(): Promise<IUser> {
    const [numberOfAffectedRows, affectedRows] = await UserModel.update(
      {
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.role,
      },
      {
        where: {
          id: this.id,
        },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("User not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as IUser;
  }

  /**
   * Delete an existing user
   */
  public async delete(): Promise<number> {
    return await UserModel.destroy({
      where: {
        id: this.id,
      },
    });
  }

  /**
   * Find a user by id
   */

  public static async findById(id: number): Promise<IUser | null> {
    const user = await UserModel.findByPk(id);
    if (user) {
      return user.dataValues as IUser;
    }
    return null;
  }
}

export default User;
