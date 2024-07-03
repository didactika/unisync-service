import { DataTypes, ModelAttributes } from "sequelize";
import { ECourseType } from "../../enums/course-type-enum";

const courseSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: true,
    unique: true,
  },
  type: {
    type: DataTypes.ENUM(ECourseType.BASE, ECourseType.TEMPLATE, ECourseType.MIGRATION),
    allowNull: false,
    defaultValue: ECourseType.BASE,
  },
  fullname: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: false,
  },
  shortname: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: false,
  },
  idnumber: {
    type: DataTypes.STRING(128),
    allowNull: true,
    unique: false,
  },
  availability: {
    type: DataTypes.JSON,
    allowNull: true,
    unique: false,
  }
};

export default courseSchema;
