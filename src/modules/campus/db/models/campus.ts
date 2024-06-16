import { Sequelize, DataTypes } from "sequelize";
import BaseModel from "../../../../db/models/base-model";
import { CampusAttributes } from "../../types/db/campus";
import { InitializeParams } from "../../../../types/db/models/initialize-params";

class Campus extends BaseModel<CampusAttributes> {
  static initialize(params: InitializeParams): void {
    Campus.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          unique: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        version: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "campus",
        ...params
      }
    );
  }
}

export default Campus;
