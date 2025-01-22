import { DataTypes, ModelAttributes } from "sequelize";

const groupingSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: false,
  },
  idnumber: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: false,
  },
  idOnCampus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
};

export default groupingSchema;
