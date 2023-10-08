/**
 * Campus model interface
 * @interface ICampus
 * @description This interface is used to define the campus
 */
export default interface ICampus {
    id?: string;
    uuid?: string;
    name: string;
    url: string;
    token: string;
    createdAt?: Date;
}