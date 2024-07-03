import { DataTypes, ModelAttributes } from "sequelize";

const groupingGroupSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idGroup: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  idGrouping: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
};

export default groupingGroupSchema;
