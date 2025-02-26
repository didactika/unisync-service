import { DataTypes, ModelAttributes } from "sequelize";

const modFolderSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  display_on_course_page: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  show_expanded: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  show_download_button: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  force_download: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  folder_contents: {
    type: DataTypes.JSON,
    allowNull: true,
  }
};

export default modFolderSchema;
