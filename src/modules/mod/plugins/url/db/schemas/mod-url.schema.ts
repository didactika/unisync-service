import {DataTypes, ModelAttributes} from "sequelize";

const modUrlSchema: ModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    intro: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    idnumber: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    visible: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    showDescription: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    groupMode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    externalUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    display: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    displayOptions: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    parameters: {
        type: DataTypes.JSON,
        allowNull: true,
    }
};

export default modUrlSchema;
