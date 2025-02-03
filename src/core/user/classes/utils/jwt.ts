import jwt, { JwtPayload } from "jsonwebtoken";
import environment from "../../../../config/environment";

export default class JWT {
  /**
   * @method generateAccessToken
   * @description Generate access token
   * @param {object} payload The data of the token
   * @param {string} secret The secret of the token
   * @param {string | number | undefined} expiresIn Time to expire the token
   * @returns {string} token
   * @memberof JWT
   */
  public static generateAccessToken(
    payload: object,
    secret: string = environment.jwt.JWT_SECRET,
    expiresIn: string | number | undefined = environment.jwt.JWT_EXPIRES_IN
  ): string {
    return expiresIn
      ? jwt.sign(payload, secret, { expiresIn: Number(expiresIn) })
      : jwt.sign(payload, secret, undefined);
  }

  /**
   * @method verifyToken
   * @description Verify token
   * @param {string} token Token of the user
   * @param {string} secret Secret of the token
   * @returns {JwtPayload} JwtPayload
   * @memberof JWT
   */
  public static verifyToken(token: string, secret: string = environment.jwt.JWT_SECRET): JwtPayload | undefined {
    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      return undefined;
    }
  }
}
