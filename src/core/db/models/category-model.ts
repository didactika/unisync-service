import categorySchema from "../schemas/category-schema";
import BaseModel from "./base-model";
import { CategoryAttributes, CategoryCreationAttributes } from "../types/models/category";
import CampusModel from "../../campus/db/models/campus";

class CategoryModel extends BaseModel<CategoryAttributes, CategoryCreationAttributes> {
  protected static requiredModels = [CampusModel];

  public static initialize() {
    CategoryModel.init(categorySchema, {
      sequelize: this._sequelize,
      tableName: "category",
    });
  }

  protected static associate() {
    CategoryModel.belongsTo(CampusModel, { foreignKey: "campusId", as: "campus" });
  }
}

export default CategoryModel;
