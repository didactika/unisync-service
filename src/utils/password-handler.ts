import constants from "../bin/constants";
import CryptoJS from "crypto-js";

/**
 * @class PasswordHandler
 */
export default class PasswordHandler {
  /**
   * encrypt a password
   * @param {string} plainPassword 
   * @returns {string} encrypted password
   */
  public static EncryptPassword(plainPassword: string): string {
    return CryptoJS.AES.encrypt(plainPassword, constants.CRYPTO_KEY).toString();
  }

  /**
   * decrypt a password
   * @param {string} storedCryptoPassword 
   * @returns {string} decrypted password
   */
  private static DecryptPasswords(storedCryptoPassword: string): string {
      return CryptoJS.AES.decrypt(
        storedCryptoPassword,
        constants.CRYPTO_KEY
      ).toString(CryptoJS.enc.Utf8);
  }

  /**
   * Compare passwords
   * @param {string}plainPassword 
   * @param {string} storedCryptoPassword 
   * @returns {boolean} true if the passwords are equal, false if not
   */
  public static ComparePasswords(
    plainPassword: string,
    storedCryptoPassword: string
  ): boolean {
    return plainPassword === this.DecryptPasswords(storedCryptoPassword);
  }

  /**
   * Check if the password is valid
   * @param {string} password 
   * @returns {boolean} true if the password is valid, false if not
   */
  public static isValidPassword(password: string): boolean {
    return new RegExp(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*(?=.*[a-z]).*(?=.*[A-Z]).*(?=.*[0-9]).{8,20}$/).test(password) ? true : false;
  }
}
