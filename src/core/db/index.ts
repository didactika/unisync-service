import { Sequelize } from "sequelize-typescript";
import { Client } from "pg";
import environment from "../../config/environment/index";
import ComponentLoader from "../component/classes/component-loader";
import { ELoadPath } from "../component/enums/load-path-enum";
import { EComponentNature } from "../component/enums/component-nature-enum";

/**
 * @class Database
 */
class DB {
  public readonly sequelize: Sequelize;
  private static instance: DB;

  private constructor() {
    this.sequelize = new Sequelize({
      database: environment.database.DB_NAME,
      username: environment.database.DB_USERNAME,
      password: environment.database.DB_PASSWORD,
      host: environment.database.DB_HOST,
      port: parseInt(environment.database.DB_PORT),
      dialect: environment.database.DB_DIALECT,
      // logging: Boolean(environment.database.DB_LOGGING),
      retry: {
        max: parseInt(environment.database.DB_RETRY_MAX),
        timeout: parseInt(environment.database.DB_RETRY_TIMEOUT),
      },
    });
  }

  /**
   * Database connection
   */
  private async connect(): Promise<void> {
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

  /**
   * Verificar y crear la base de datos si no existe
   */
  private async ensureDatabaseExists(): Promise<void> {
    const client = new Client({
      connectionString: `${environment.database.DB_DIALECT}://${environment.database.DB_USERNAME}:${environment.database.DB_PASSWORD}@${environment.database.DB_HOST}:${environment.database.DB_PORT}/${environment.database.DB_DIALECT}`,
    });

    try {
      await client.connect();
      const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${environment.database.DB_NAME}';`);
      if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE ${environment.database.DB_NAME};`);
        console.log(`Database ${environment.database.DB_NAME} created successfully.`);
      } else {
        console.log(`Database ${environment.database.DB_NAME} already exists.`);
      }
    } catch (error: any) {
      console.error(`Error ensuring database exists: ${error.message}`);
    } finally {
      await client.end();
    }
  }

  /**
   * Inicializar modelos del sistema dinámicamente
   */
  public async initializeBaseSystemModels(): Promise<void> {
    await ComponentLoader.loadComponents({
      directoryPath: ELoadPath.CORE,
      componentDirectories: ["db"],
      directory: "models",
      method: "initialize",
    });
  }

  /**
   * Inicializar modelos dinámicamente
   */
  public async initializeModel(component: string): Promise<void> {
    await ComponentLoader.loadComponents({
      componentDirectories: [component],
      directory: "db/models",
      method: "initialize",
    });
  }

  /**
   * Initialize the database
   * @returns {boolean} true if the database is initialized, false if not
   */
  public static async initialize(): Promise<void> {
    DB.instance = new DB();
    await DB.instance.connect();
  }

  /**
   * Get the database instance
   * @returns {DB} the database instance
   */
  public static getInstance(): DB {
    if (!DB.instance) {
      this.initialize();
    }
    return DB.instance;
  }
}

export default DB;
