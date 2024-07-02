import { DataTypes, ModelAttributes } from "sequelize";

const componentLogSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  componentName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  oldVersion: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  newVersion: {
    type: DataTypes.STRING(32),
    allowNull: true,
  }
};

export default componentLogSchema;
