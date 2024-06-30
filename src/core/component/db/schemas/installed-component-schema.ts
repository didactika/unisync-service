import { DataTypes, ModelAttributes } from "sequelize";

const installedComponentSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  version: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  versionFilePath: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
};

export default installedComponentSchema;
