import { DataTypes, ModelAttributes } from "sequelize";

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
    type: DataTypes.ENUM("pending", "inprogress", "migrated", "errors"),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Status cannot be empty",
      },
    },
  },
};

export default levelInstanceStatusSchema;
