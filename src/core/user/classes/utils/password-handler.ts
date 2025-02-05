import CryptoJS from "crypto-js";
import environment from "../../../../config/environment";

/**
 * @class PasswordHandler
 */
export default class PasswordHandler {
  /**
   * @method encryptPassword
   * @description encrypt a password
   * @param {string} plainPassword 
   * @returns {string} encrypted password
   * @memberof PasswordHandler
   */
  public static encryptPassword(plainPassword: string): string {
    return CryptoJS.AES.encrypt(plainPassword, environment.crypto.CRYPTO_KEY).toString();
  }

  /**
   * @method decryptPasswords
   * @description decrypt a password
   * @param {string} storedCryptoPassword 
   * @returns {string} decrypted password
   * @memberof PasswordHandler
   */
  private static decryptPasswords(storedCryptoPassword: string): string {
      return CryptoJS.AES.decrypt(
        storedCryptoPassword,
        environment.crypto.CRYPTO_KEY
      ).toString(CryptoJS.enc.Utf8);
  }

  /**
   * @method comparePasswords
   * @description Compare passwords
   * @param {string}plainPassword 
   * @param {string} storedCryptoPassword 
   * @returns {boolean} true if the passwords are equal, false if not
   * @memberof PasswordHandler
   */
  public static comparePasswords(
    plainPassword: string,
    storedCryptoPassword: string
  ): boolean {
    return plainPassword === this.decryptPasswords(storedCryptoPassword);
  }

  /**
   * @method isValidPassword
   * @description Check if the password is valid
   * @param {string} password 
   * @returns {boolean} true if the password is valid, false if not
   * @memberof PasswordHandler
   */
  public static isValidPassword(password: string): boolean {
    return new RegExp(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*(?=.*[a-z]).*(?=.*[A-Z]).*(?=.*[0-9]).{8,20}$/).test(password) ? true : false;
  }
}