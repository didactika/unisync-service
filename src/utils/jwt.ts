import jwt, { JwtPayload } from "jsonwebtoken";

export default class JWT {
  /**
   * Generate a token
   * @param {object} payload The data of the token
   * @param {string} secret The secret of the token
   * @param {string | number | undefined} expiresIn Time to expire the token
   * @returns token
   */
  public static generateAccessToken(
    payload: object,
    secret: string,
    expiresIn: string | number | undefined = undefined
  ): string {
    return expiresIn
      ? jwt.sign(payload, secret, { expiresIn: expiresIn })
      : jwt.sign(payload, secret);
  }

  /**
   * Veryfy token 
   * @param {string} token Token of the user
   * @param {string} secret Secret of the token
   * @returns JwtPayload
   */
  public static verifyToken(token: string, secret: string): JwtPayload {
    return jwt.verify(token, secret) as JwtPayload;
  }
}
