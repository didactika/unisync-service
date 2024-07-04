import BaseEntity from "../../../classes/entities/base-entity";
import InstalledComponentModel from "../../db/models/installed-component-model";
import { InstalledComponentFilter } from "../../types/classes/entities/installed-component-filter";
import { IInstalledComponent } from "../../types/classes/entities/installed-component-interface";

export default class InstalledComponent extends BaseEntity<IInstalledComponent> implements IInstalledComponent {
  private _name: string;
  private _version: string;
  private _versionFilePath: string;

  constructor(installedComponent: IInstalledComponent) {
    super(installedComponent);
    this._name = installedComponent.name;
    this._version = installedComponent.version;
    this._versionFilePath = installedComponent.versionFilePath;
  }

  // Getters and setters
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get version(): string {
    return this._version;
  }

  set version(value: string) {
    this._version = value;
  }

  get versionFilePath(): string {
    return this._versionFilePath;
  }

  set versionFilePath(value: string) {
    this._versionFilePath = value;
  }

  public toJSON(): IInstalledComponent {
    return {
      id: this.id,
      name: this.name,
      version: this.version,
      versionFilePath: this.versionFilePath,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<IInstalledComponent> {
    return (
      await InstalledComponentModel.create({
        name: this.name,
        version: this.version,
        versionFilePath: this.versionFilePath,
      })
    ).dataValues as IInstalledComponent;
  }

  public async update(): Promise<IInstalledComponent> {
    const [numberOfAffectedRows, affectedRows] = await InstalledComponentModel.update(
      {
        name: this.name,
        version: this.version,
        versionFilePath: this.versionFilePath,
      },
      {
        where: {
          id: this.id,
        },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("InstalledComponent not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as IInstalledComponent;
  }

  public static async findOne<IInstalledComponent>(
    filter?: InstalledComponentFilter
  ): Promise<IInstalledComponent | null> {
    const installedComponent = await InstalledComponentModel.findOne(filter ? { where: filter } : {});
    return installedComponent ? (installedComponent as IInstalledComponent) : null;
  }

  public static async findMany<IInstalledComponent>(filter?: InstalledComponentFilter): Promise<IInstalledComponent[]> {
    const installedComponents = await InstalledComponentModel.findAll(filter ? { where: filter } : {});
    return installedComponents.map((installedComponent) => installedComponent.dataValues as IInstalledComponent);
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await InstalledComponentModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("InstalledComponent not found");
    }

    return numberOfAffectedRows;
  }
}
