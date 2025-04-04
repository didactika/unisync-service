import { DataTypes, ModelAttributes } from "sequelize";
import { EMigrationStatus } from "../../../../core/enums/migration-status-enum";

const courseMigrationInformationSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  courseOriginId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseTargetId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  courseTemplateId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  campusOriginId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  campusTargetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(EMigrationStatus)),
    defaultValue: EMigrationStatus.PENDING,
    allowNull: false,
  },
};

export default courseMigrationInformationSchema;
