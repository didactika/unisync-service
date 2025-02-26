import { DataTypes, ModelAttributes } from "sequelize";

const modProtectedPdfSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  download_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
};

export default modProtectedPdfSchema;
