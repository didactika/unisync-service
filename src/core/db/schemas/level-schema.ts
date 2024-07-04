import { DataTypes, ModelAttributes } from "sequelize";

const levelSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(24),
    allowNull: false,
    unique: true,
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
};

export default levelSchema;
