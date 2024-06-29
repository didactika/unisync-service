import { UUIDV4 } from "sequelize";
import CampusModel from "../db/models/campus";
import { ICampus } from "../types/classes/campus-interface";

class Campus implements ICampus {
  public readonly id: number | undefined;
  public readonly uuid: string | undefined;
  private _name: string;
  private _url: string;
  private _token: string;
  private _version: string | undefined;
  private _createdAt: Date | undefined;
  private _updatedAt: Date | undefined;

  constructor(campus: ICampus) {
    this.id = campus.id;
    this.uuid = campus.uuid;
    this._name = campus.name;
    this._url = campus.url;
    this._token = campus.token;
    this._createdAt = campus.createdAt || new Date();
    this._updatedAt = campus.updatedAt || new Date();
  }

  // Getters and setters
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get version(): string | undefined {
    return this._version;
  }

  set version(value: string | undefined) {
    this._version = value;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  set updatedAt(value: Date | undefined) {
    this._updatedAt = value;
  }

  set createdAt(value: Date | undefined) {
    this._createdAt = value;
  }

  public toJSON(): ICampus {
    return {
      id: this.id,
      uuid: this.uuid,
      name: this.name,
      url: this.url,
      token: this.token,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<ICampus> {
    return (
      await CampusModel.create({
        uuid: this.uuid || UUIDV4().toString({}),
        name: this.name,
        url: this.url,
        token: this.token,
        version: this.version,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      })
    ).dataValues as ICampus;
  }

  public async delete(): Promise<number> {
    return CampusModel.destroy({
      where: {
        uuid: this.uuid,
      },
    });
  }
}

export default Campus;
