import LevelModel from "../../db/models/level-model";
import { ILevel } from "../../types/classes/entities/level-interface";
import BaseEntity from "./base-entity";

class Level extends BaseEntity<ILevel> implements ILevel {
  public readonly id: number | undefined;
  private _name: string;

  constructor(level: ILevel) {
    super(level);
    this.id = level.id;
    this._name = level.name;
  }

  // Getters

  get name(): string {
    return this._name;
  }

  // Setters

  set name(value: string) {
    this._name = value;
  }

  public toJSON(): ILevel {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<ILevel> {
    return (
      await LevelModel.create({
        name: this.name,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      })
    ).dataValues as ILevel;
  }

  public async update(): Promise<ILevel> {
    const [numberOfAffectedRows, affectedRows] = await LevelModel.update(
      {
        name: this.name,
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
      throw new Error("Level not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as ILevel;
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await LevelModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Level not found");
    }

    return numberOfAffectedRows;
  }
}

export default Level;
