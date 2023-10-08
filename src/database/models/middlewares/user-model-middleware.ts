import PasswordHandler from '../../../utils/password-handler';
import IMUser from '../../../structures/types/database-schemas-types/user-schema-types';
import { MongoServerError } from 'mongodb';

/**
 * @class UserModelMiddleware
 */
export default class UserModelMiddleware {

  /**
   * Validate the username
   * @param {IMUser} this 
   * @param {() => void} next 
   * @memberof UserModelMiddleware
   */
  public static validateUserName(this: IMUser, next: () => void): void {
    if (!new RegExp(/^[a-z.,@#]+$/).test(this.username))
      throw new Error("Invalid username");
    next();
  }

  /**
   * Validate if the email is valid and have a length of 5 to 50 characters
   * @param {IMUser} this
   * @param {() => void} next
   * @memberof UserModelMiddleware
   */
  public static validateEmail(this: IMUser, next: () => void) {
    if (!new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).test(this.email))
      throw new Error("Invalid email");
    next();
  }

  /**
   * Validate the password
   * @param {IMUser} this 
   * @param {() => void} next 
   * @memberof UserModelMiddleware
   */
  public static validatePassword(this: IMUser, next: () => void) {
    if (!PasswordHandler.isValidPassword(this.password)) {
      throw new Error("Invalid password");
    }
    next();
  }

  /**
   * Encrypt the password
   * @param {IMUser} this 
   * @param {() => void} next 
   * @memberof UserModelMiddleware
   */
  public static encryptPassword(this: IMUser, next: () => void): void {
    this.password = PasswordHandler.EncryptPassword(this.password);
    next();
  }

  /**
   * Check if have data is duplicate
   * @param {Error} error
   * @param {IMUser} doc
   * @param {(error?: Error) => void} next
   * @memberof UserModelMiddleware
   */
  public static isDuplicatedData(error: Error, doc: IMUser, next: (error?: Error) => void) {
    const err = error as MongoServerError;
    if (err && err.name === 'MongoServerError' && err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      next(new Error(`The ${field} is already in use`));
    }
    next(err);
  }
}