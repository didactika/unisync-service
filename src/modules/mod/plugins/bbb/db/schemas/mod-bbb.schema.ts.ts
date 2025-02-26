import { DataTypes, ModelAttributes } from "sequelize";

const bbbSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  instance_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  welcome_message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  wait_for_moderator: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  record_meeting: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  disable_cam: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  disable_mic: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  disable_private_chat: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  disable_public_chat: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  disable_shared_notes: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  hide_user_list: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  opening_time: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  closing_time: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
};

export default bbbSchema;
