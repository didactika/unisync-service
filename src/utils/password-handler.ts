import constants from "../bin/constants";
import CryptoJS from "crypto-js";

export default class PasswordHandler {
  public static EncryptPassword(plainPassword: string): string {
    return CryptoJS.AES.encrypt(plainPassword, constants.CRYPTO_KEY).toString();
  }

  public static DecryptPasswords(storedCryptoPassword: string): string {
      return CryptoJS.AES.decrypt(
        storedCryptoPassword,
        constants.CRYPTO_KEY
      ).toString(CryptoJS.enc.Utf8);
  }

  public static ComparePasswords(
    plainPassword: string,
    storedCryptoPassword: string
  ): boolean {
    return plainPassword === this.DecryptPasswords(storedCryptoPassword);
  }

  public static isValidPassword(password: string): boolean {
    return new RegExp(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*(?=.*[a-z]).*(?=.*[A-Z]).*(?=.*[0-9]).{8,20}$/).test(password) ? true : false;
  }
}
