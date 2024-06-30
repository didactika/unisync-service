import UserModel from "../db/models/user-model";
import { IUser } from "../types/classes/user-interface";

class User implements IUser {
  public readonly id: number | undefined;
  public readonly uuid: string | undefined;
  private _username: string;
  private _password: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _role: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.uuid = user.uuid;
    this._username = user.username;
    this._password = user.password;
    this._firstName = user.firstName;
    this._lastName = user.lastName;
    this._email = user.email;
    this._role = user.role;
    this.createdAt = user.createdAt || new Date();
    this.updatedAt = user.updatedAt || new Date();
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

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  // Methods

  /**
   * Create a new user
   */
  public async create(): Promise<IUser> {
    return (
      await UserModel.create({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.role,
      })
    ).dataValues as IUser;
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
        returning: true, // This will return the updated object
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
  public async delete(): Promise<boolean> {
    const numberOfAffectedRows = await UserModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("User not found");
    }

    return true;
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
