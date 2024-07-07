import CampusConnectorCategory from "../../campus/classes/campus-connector/campus-connector-category";
import Campus from "../../campus/classes/entities/campus";
import { ICampus } from "../../campus/types/classes/entities/campus-interface";
import { ICategory } from "../../types/classes/entities/category-interface";
import Category from "../entities/category-entity";

export default class CategoryController {
  public static async syncCategoriesFromCampus(campusId: number): Promise<ICategory[]> {
    const campus = (await Campus.findOne({ id: campusId })) as ICampus;
    if (!campus) return [];
    const campusCategoryActions = new CampusConnectorCategory(campus);
    const categoriesCampusData = await campusCategoryActions.getCategories();
    const categoriesToSync: Promise<ICategory>[] = [];

    for (const category of categoriesCampusData) {
      const categoryFound = (await Category.findOne({ idOnCampus: category.id, campusId: campusId })) as ICategory;
      let categoryDB: Category;
      if (!categoryFound) {
        categoryDB = new Category({
          name: category.name,
          idnumber: category.idnumber,
          idOnCampus: category.id,
          campusId: campusId,
        });
      } else {
        categoryDB = new Category(categoryFound);
        categoryDB.name = category.name;
        categoryDB.idnumber = category.idnumber;
      }
      categoryFound ? categoriesToSync.push(categoryDB.update()) : categoriesToSync.push(categoryDB.create());
    }
    return await Promise.all(categoriesToSync);
  }
}
