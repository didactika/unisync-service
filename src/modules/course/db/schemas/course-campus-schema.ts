import { DataTypes, ModelAttributes } from "sequelize";

const courseCampusSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  campusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idOnCampus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export default courseCampusSchema;
