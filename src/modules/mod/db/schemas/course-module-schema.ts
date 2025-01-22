import { DataTypes, ModelAttributes } from "sequelize";

const courseModuleSchema: ModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    moduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    instanceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    }
}

export default courseModuleSchema;