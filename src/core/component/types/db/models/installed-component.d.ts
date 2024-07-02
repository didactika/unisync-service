
/**
 * @typedef {Object} InstalledComponentAttributes
 * @property {number} id
 * @property {string} name
 * @property {string} version
 * @property {string} description
 * @property {string} versionFilePath
 */
export type InstalledComponentAttributes = {
  id: number;
  name: string;
  version: string;
  versionFilePath: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @typedef {Object} InstalledComponentCreationAttributes
 * @property {string} name
 * @property {string} version
 * @property {string} versionFilePath
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]
 */
export type InstalledComponentCreationAttributes = Omit<InstalledComponentAttributes, 'id'>;
