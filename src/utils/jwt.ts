import jwt, { JwtPayload } from "jsonwebtoken";

export default class JWT {
  /**
   * @method GenerateAccessToken
   * @description Generate access token
   * @param {object} payload The data of the token
   * @param {string} secret The secret of the token
   * @param {string | number | undefined} expiresIn Time to expire the token
   * @returns {string} token
   * @memberof JWT
   */
  public static GenerateAccessToken(
    payload: object,
    secret: string,
    expiresIn: string | number | undefined = undefined
  ): string {
    return expiresIn
      ? jwt.sign(payload, secret, { expiresIn: expiresIn })
      : jwt.sign(payload, secret);
  }

  /**
   * @method VerifyToken
   * @description Veryfy token 
   * @param {string} token Token of the user
   * @param {string} secret Secret of the token
   * @returns {JwtPayload} JwtPayload
   * @memberof JWT
   */
  public static VerifyToken(token: string, secret: string): JwtPayload {
    return jwt.verify(token, secret) as JwtPayload;
  }
}
