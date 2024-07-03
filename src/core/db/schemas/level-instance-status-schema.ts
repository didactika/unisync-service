import { DataTypes, ModelAttributes } from "sequelize";
import { EMigrationStatus } from "../../enums/migration-status-enum";

const levelInstanceStatusSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idInstance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Instance id cannot be empty",
      },
    },
  },
  idLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Level id cannot be empty",
      },
    },
  },
  status: {
    type: DataTypes.ENUM(typeof EMigrationStatus),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Status cannot be empty",
      },
    },
  },
};

export default levelInstanceStatusSchema;
