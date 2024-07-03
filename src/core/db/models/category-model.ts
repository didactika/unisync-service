import categorySchema from "../schemas/category-schema";
import { InitializeParams } from "../types/models/initialize-params";
import BaseModel from "./base-model";
import { CategoryAttributes, CategoryCreationAttributes } from "../types/models/category";
import CampusModel from "../../campus/db/models/campus";

class CategoryModel extends BaseModel<CategoryAttributes, CategoryCreationAttributes> {
  public static initialize(params: InitializeParams) {
    CategoryModel.init(categorySchema, {
      tableName: "categories",
      ...params,
    });
    CampusModel.initialize(params);
    this.associate();
  }

  private static associate() {
    CategoryModel.belongsTo(CampusModel, { foreignKey: "campusId", as: "campus" });
  }
}

export default CategoryModel;
