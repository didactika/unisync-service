import ContextModel from "../../db/models/context-model";
import { IContext } from "../../types/classes/entities/context-interface";
import BaseEntity from "./base-entity";

class Context extends BaseEntity<IContext> implements IContext {
  public readonly id: number | undefined;
  private _name: string;

  constructor(context: IContext) {
    super(context);
    this.id = context.id;
    this._name = context.name;
  }

  // Getters

  get name(): string {
    return this._name;
  }

  // Setters

  set name(value: string) {
    this._name = value;
  }

  public toJSON(): IContext {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<IContext> {
    return (
      await ContextModel.create({
        name: this.name,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      })
    ).dataValues as IContext;
  }

  public async update(): Promise<IContext> {
    const [numberOfAffectedRows, affectedRows] = await ContextModel.update(
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
      throw new Error("Context not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as IContext;
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await ContextModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Context not found");
    }

    return numberOfAffectedRows;
  }
}

export default Context;
