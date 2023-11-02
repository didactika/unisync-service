import PasswordHandler from '../../../utils/password-handler';
import { IMUser } from '../../../structures/types/database-schemas-types/user-schema-types';
import httpClient from 'http-response-client';
import { Schema } from 'mongoose';
import ModelMiddleware from './model-middleware';

/**
 * @class UserModelMiddleware
 */
export default class UserModelMiddleware extends ModelMiddleware {

  /**
   * Apply all middlewares
   * @param {Schema} schema
   * @memberof UserModelMiddleware
   */
  public static applyAll(schema: Schema): void {
    UserModelMiddleware.validateUserName(schema);
    UserModelMiddleware.validateEmail(schema);
    UserModelMiddleware.validatePassword(schema);
    UserModelMiddleware.encryptPassword(schema);
    UserModelMiddleware.checkDuplicatedData(schema);
    UserModelMiddleware.checkRequiredFields(schema);
    UserModelMiddleware.checkInvalidFields(schema);
    UserModelMiddleware.checkInvalidId(schema);
    UserModelMiddleware.validateUUID(schema);
  }

  /**
   * Validate the username
   * @param {Schema} schema
   * @memberof UserModelMiddleware
   */
  public static validateUserName(schema: Schema): void {
    schema.pre<IMUser>('save', function (next) {
      if (!new RegExp(/^[a-z.,@#]+$/).test(this.username))
        next(new httpClient.errors.BadRequest({ msg: "Invalid username" }));
      next();
    });
  }

  /**
   * Validate if the email is valid and have a length of 5 to 50 characters
   * @param {Schema} schema 
   * @memberof UserModelMiddleware
   */
  public static validateEmail(schema: Schema): void {
    schema.pre<IMUser>('save', function (next) {
      if (!new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).test(this.email))
        next(new httpClient.errors.BadRequest({ msg: "Invalid email" }));
      next();
    });
  }

  /**
   * Validate the password
   * @param {Schema} schema
   * @memberof UserModelMiddleware
   */
  public static validatePassword(schema: Schema): void {
    schema.pre<IMUser>('save', function (next) {
      if (!PasswordHandler.isValidPassword(this.password)) {
        next(new httpClient.errors.BadRequest({ msg: "Invalid password" }));
      }
      next();
    });
  }

  /**
   * Encrypt the password
   * @param {Schema} schema
   * @memberof UserModelMiddleware
   */
  public static encryptPassword(schema: Schema): void {
    schema.pre<IMUser>('save', function (next) {
      this.password = PasswordHandler.EncryptPassword(this.password);
      next();
    });
  }
}