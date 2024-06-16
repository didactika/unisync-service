import { DataTypes} from 'sequelize';
import { UserAttributes, UserCreationAttributes } from '../../types/db/models/user';
import BaseModel from '../../../../db/models/base-model';
import { InitializeParams } from '../../../../types/db/models/initialize-params';

class UserModel extends BaseModel<UserAttributes, UserCreationAttributes> {
  
  public static initialize(params: InitializeParams) {
    UserModel.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Username cannot be empty',
          },
          len: {
            args: [4, 128],
            msg: 'Username must be between 4 and 128 characters',
          },
        },
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password cannot be empty',
          },
          len: {
            args: [8, 128],
            msg: 'Password must be between 8 and 128 characters',
          },
        },
      },
      firstName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'First name cannot be empty',
          },
          len: {
            args: [1, 128],
            msg: 'First name must be between 1 and 128 characters',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Last name cannot be empty',
          },
          len: {
            args: [1, 128],
            msg: 'Last name must be between 1 and 128 characters',
          },
        },
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Must be a valid email address',
          },
        },
      },
      role: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Role cannot be empty',
          },
          isIn: {
            args: [['admin', 'user', 'moderator']],
            msg: 'Role must be one of admin, user, or moderator',
          },
        },
      },
    }, {
      tableName: 'users',
      ...params,
    });
  }
}

export default UserModel;
