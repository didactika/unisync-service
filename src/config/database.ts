import { Dialect } from 'sequelize';

export const DB_NAME = process.env.DB_NAME as string;
export const DB_USERNAME = process.env.DB_USERNAME as string;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT as string;
export const DB_DIALECT = process.env.DB_DIALECT as Dialect;
