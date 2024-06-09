import config from "../bin/config";
import CryptoJS from "crypto-js";

/**
 * @class PasswordHandler
 */
export default class PasswordHandler {
  /**
   * @method EncryptPassword
   * @description encrypt a password
   * @param {string} plainPassword 
   * @returns {string} encrypted password
   * @memberof PasswordHandler
   */
  public static EncryptPassword(plainPassword: string): string {
    return CryptoJS.AES.encrypt(plainPassword, config.CRYPTO_KEY).toString();
  }

  /**
   * @method DecryptPasswords
   * @description decrypt a password
   * @param {string} storedCryptoPassword 
   * @returns {string} decrypted password
   * @memberof PasswordHandler
   */
  private static DecryptPasswords(storedCryptoPassword: string): string {
      return CryptoJS.AES.decrypt(
        storedCryptoPassword,
        config.CRYPTO_KEY
      ).toString(CryptoJS.enc.Utf8);
  }

  /**
   * @method ComparePasswords
   * @description Compare passwords
   * @param {string}plainPassword 
   * @param {string} storedCryptoPassword 
   * @returns {boolean} true if the passwords are equal, false if not
   * @memberof PasswordHandler
   */
  public static ComparePasswords(
    plainPassword: string,
    storedCryptoPassword: string
  ): boolean {
    return plainPassword === this.DecryptPasswords(storedCryptoPassword);
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
