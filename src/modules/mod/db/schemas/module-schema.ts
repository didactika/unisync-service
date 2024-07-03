import { DataTypes, ModelAttributes } from "sequelize";

const moduleSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  }
};

export default moduleSchema;
