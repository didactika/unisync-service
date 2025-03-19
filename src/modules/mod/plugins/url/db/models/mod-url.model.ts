import BaseModel from "../../../../../../core/db/models/base-model";
import {UrlModuleAttributes, UrlModuleCreationAttributes} from "../../types/db/models/mod-url";

class UrlModuleModel extends BaseModel<UrlModuleAttributes, UrlModuleCreationAttributes> {
    protected static requiredModels = [CourseModel, ModuleModel, SectionModel];

    public static initialize() {
        CourseModuleModel.init(courseModuleSchema, {
            sequelize: this._sequelize,
            tableName: "course_module",
        });
    }

    protected static associate() {
        CourseModuleModel.belongsTo(CourseModel, {
            foreignKey: "courseId",
            as: "course",
        });
        CourseModuleModel.belongsTo(ModuleModel, {
            foreignKey: "moduleId",
            as: "module",
        });
        CourseModuleModel.belongsTo(SectionModel, {
            foreignKey: "sectionId",
            as: "section",
        });
    }
}

export default CourseModuleModel;
