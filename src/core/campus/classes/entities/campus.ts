import CampusModel from "../../db/models/campus";
import { ICampus } from "../../types/classes/entities/campus-interface";
import BaseEntity from "../../../classes/entities/base-entity";
import { CampusFilter } from "../../types/classes/entities/campus-filter";

class Campus extends BaseEntity<ICampus> implements ICampus {
  public readonly id: number | undefined;
  public readonly uuid: string | undefined;
  private _name: string;
  private _url: string;
  private _token: string;
  private _version?: string;

  constructor(campus: ICampus) {
    super(campus);
    this.id = campus.id;
    this.uuid = campus.uuid;
    this._name = campus.name;
    this._url = campus.url;
    this._token = campus.token;
    this._version = campus.version;
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
        uuid: this.uuid || undefined,
        name: this.name,
        url: this.url,
        token: this.token,
        version: this.version,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      })
    ).dataValues as ICampus;
  }

  public async update(): Promise<ICampus> {
    const [numberOfAffectedRows, affectedRows] = await CampusModel.update(
      {
        uuid: this.uuid,
        name: this.name,
        url: this.url,
        token: this.token,
        version: this.version,
        updatedAt: this.updatedAt,
      },
      {
        where: {
          id: this.id,
        },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("Campus not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as ICampus;
  }

  public static async findOne<ICampus>(filter?: CampusFilter): Promise<ICampus | null> {
    const campus = await CampusModel.findOne(filter ? { where: filter } : {});
    return campus ? (campus as ICampus) : null;
  }

  public static async findMany<ICampus>(filter?: CampusFilter): Promise<ICampus[]> {
    return (await CampusModel.findAll(filter ? { where: filter } : {})).map((campus) => campus.dataValues as ICampus);
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await CampusModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("User not found");
    }

    return numberOfAffectedRows;
  }
}

export default Campus;
