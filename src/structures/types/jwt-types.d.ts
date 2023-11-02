/**
 * @type UserSessionPayload
 * @description The user session payload for the jwt token
 */
export type UserSessionPayload = {
    uuid: string;
    username: string;
    email: string;
    exp: number;
}