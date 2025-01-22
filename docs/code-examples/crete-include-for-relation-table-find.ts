import CampusModel from "../../../../core/campus/db/models/campus";
import BaseModel from "../../../../core/db/models/base-model";
import CategoryModel from "../../../../core/db/models/category-model";
import { CourseCampusAttributes, CourseCampusCreationAttributes } from "../../types/db/models/course-campus";
import courseCampusSchema from "../schemas/course-campus-schema";
import CourseModel from "./course-model";

class CourseCampusModel extends BaseModel<CourseCampusAttributes, CourseCampusCreationAttributes> {
  protected static requiredModels = [CourseModel, CampusModel, CategoryModel];
  
  public static initialize() {
    CourseCampusModel.init(courseCampusSchema, {
      sequelize: this._sequelize,
      tableName: "course_campus",
    });
  }

  protected static associate() {
    CourseCampusModel.belongsTo(CourseModel, {
      foreignKey: "courseId",
      as: "course",
    });
    CourseCampusModel.belongsTo(CampusModel, {
      foreignKey: "campusId",
      as: "campus",
    });
    CourseCampusModel.belongsTo(CategoryModel, {
      foreignKey: "categoryId",
      as: "category",
    });
  }

  /**
   * Crea la configuración include con filtros opcionales de manera dinámica.
   * @param filters - Filtros opcionales para los modelos asociados.
   * @returns - La configuración include para la consulta.
   */
  private static createInclude(filters: { [key: string]: any } = {}) {
    const include = [];

    this.requiredModels.forEach(model => {
      const alias = model.name.toLowerCase();
      const filter = filters[alias];
      if (filter) {
        include.push({ model, as: alias, where: filter });
      } else {
        include.push({ model, as: alias });
      }
    });

    return include;
  }

  /**
   * Busca un curso en un campus específico con filtros opcionales.
   * @param filters - Filtros opcionales para los modelos asociados.
   * @returns - La información del curso en el campus especificado.
   */
  public static async findCourseInCampusWithFilters(filters: { [key: string]: any } = {}): Promise<CourseCampusModel | null> {
    const include = this.createInclude(filters);

    return await CourseCampusModel.findOne({
      include: include,
    });
  }
}

export default CourseCampusModel;
