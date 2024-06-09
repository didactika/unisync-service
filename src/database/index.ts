import { Sequelize } from 'sequelize-typescript';
import { Client } from 'pg';
import constants from '../config/index';

/**
 * @class Database
 */
class Database {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      database: constants.database.DB_NAME,
      username: constants.database.DB_USERNAME,
      password: constants.database.DB_PASSWORD,
      host: constants.database.DB_HOST,
      port: parseInt(constants.database.DB_PORT),
      dialect: constants.database.DB_DIALECT,
      models: [__dirname + '/models'],
    });
  }

  /**
   * Verificar y crear la base de datos si no existe
   */
  private async ensureDatabaseExists(): Promise<void> {
    const client = new Client({
      connectionString: `${constants.database.DB_DIALECT}://${constants.database.DB_USERNAME}:${constants.database.DB_PASSWORD}@${constants.database.DB_HOST}:${constants.database.DB_PORT}/${constants.database.DB_DIALECT}`,
    });

    try {
      await client.connect();
      const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${constants.database.DB_NAME}';`);
      if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE ${constants.database.DB_NAME};`);
        console.log(`Database ${constants.database.DB_NAME} created successfully.`);
      } else {
        console.log(`Database ${constants.database.DB_NAME} already exists.`);
      }
    } catch (error: any) {
      console.error(`Error ensuring database exists: ${error.message}`);
    } finally {
      await client.end();
    }
  }

  /**
   * Database connection
   */
  public async connect(): Promise<void> {
    await this.ensureDatabaseExists();
    try {
      await this.sequelize.authenticate();
      console.log("Database connection successful");
      await this.sequelize.sync();
      console.log("Database synchronized");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  }
}

export default new Database();
