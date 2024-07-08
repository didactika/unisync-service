import { DataTypes, ModelAttributes } from "sequelize";

const categorySchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Name cannot be empty",
      },
      len: {
        args: [1, 128],
        msg: "Name must be between 1 and 128 characters",
      },
    },
  },
  idnumber: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [0, 100],
        msg: "ID number must be between 0 and 100 characters",
      },
    },
  },
  idOnCampus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Id on campus cannot be empty",
      },
    },
  },
  campusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Campus id cannot be empty",
      },
    },
  },
};

export default categorySchema;
