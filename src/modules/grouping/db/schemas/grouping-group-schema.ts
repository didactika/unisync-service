import { DataTypes, ModelAttributes } from "sequelize";

const groupingGroupSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  groupingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
};

export default groupingGroupSchema;
