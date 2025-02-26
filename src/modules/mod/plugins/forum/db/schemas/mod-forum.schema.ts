import { DataTypes, ModelAttributes } from "sequelize";

const modForumSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  force_suscribe: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lock_discussion_after: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  block_period: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  block_after: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  warn_after: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  max_attachments: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  max_bytes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  display_word_count: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  grade_forum: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
};

export default modForumSchema;
