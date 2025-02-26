import { DataTypes, ModelAttributes } from "sequelize";

const modUrlSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
