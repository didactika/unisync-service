import { Sequelize } from 'sequelize';

/**
 * type representing the parameters for the initialize method.
 */
export type InitializeParams = {
  /**
   * The Sequelize instance.
   */
  sequelize: Sequelize;

  /**
   * The plugin type.
   */
  componentType: string;
}
