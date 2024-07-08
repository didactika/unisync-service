import CategoryModel from "../../db/models/category-model";
import { CategoryFilter } from "../../types/classes/entities/category-filter";
import { ICategory } from "../../types/classes/entities/category-interface";
import BaseEntity from "./base-entity";
import Level from "./level-entity";

class Category extends BaseEntity<ICategory> implements ICategory {
  public readonly id: number | undefined;
  private _name: string;
  private _idnumber?: string;
  private _idOnCampus: number;
  private _campusId: number;

  constructor(category: ICategory) {
    super(category);
    this.id = category.id;
    this._name = category.name;
    this._idnumber = category.idnumber;
    this._idOnCampus = category.idOnCampus;
    this._campusId = category.campusId;
  }

  //Getters
  get name(): string {
    return this._name;
  }

  get idnumber(): string | undefined {
    return this._idnumber;
  }

  get idOnCampus(): number {
    return this._idOnCampus;
  }

  get campusId(): number {
    return this._campusId;
  }

  //Setters

  set name(value: string) {
    this._name = value;
  }

  set idnumber(value: string | undefined) {
    this._idnumber = value;
  }

  set idOnCampus(value: number) {
    this._idOnCampus = value;
  }

  set campusId(value: number) {
    this._campusId = value;
  }

  public toJSON(): ICategory {
    return {
      id: this.id,
      name: this.name,
      idnumber: this.idnumber,
      idOnCampus: this.idOnCampus,
      campusId: this.campusId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public async create(): Promise<ICategory> {
    return (
      await CategoryModel.create({
        name: this.name,
        idnumber: this.idnumber,
        idOnCampus: this.idOnCampus,
        campusId: this.campusId,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      })
    ).dataValues as ICategory;
  }

  public async update(): Promise<ICategory> {
    const [numberOfAffectedRows, affectedRows] = await CategoryModel.update(
      {
        name: this.name,
        idnumber: this.idnumber,
        idOnCampus: this.idOnCampus,
        campusId: this.campusId,
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
      throw new Error("Category not found or no changes detected");
    }

    return affectedRows[0].get({ plain: true }) as ICategory;
  }

  public static async findOne<ICategory>(filter?: CategoryFilter): Promise<ICategory | null> {
    const category = await CategoryModel.findOne(filter ? { where: filter } : {});
    return category ? (category as ICategory) : null;
  }

  public static async findMany<ICategory>(filter?: CategoryFilter): Promise<ICategory[]> {
    return (await CategoryModel.findAll(filter ? { where: filter } : {})).map((category) => category.dataValues as ICategory);
  }

  public async delete(): Promise<number> {
    const numberOfAffectedRows = await CategoryModel.destroy({
      where: {
        id: this.id,
      },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Category not found");
    }

    return numberOfAffectedRows;
  }
}

export default Category;
