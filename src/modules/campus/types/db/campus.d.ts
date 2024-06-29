
/**
 * @typedef {Object} CampusAttributes
 * @property {number} [id]
 * @property {string} uuid
 * @property {string} token
 * @property {string} url
 * @property {string} name
 * @property {string} version
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]

 */
export type CampusAttributes = {
  id?: number;
  uuid: string;
  token: string;
  url: string;
  name: string;
  version?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @typedef {Object} CampusCreationAttributes
 * @property {string} uuid
 * @property {string} token
 * @property {string} url
 * @property {string} name
 * @property {string} version
 */
export type CampusCreationAttributes = Omit<CampusAttributes, 'id'>;  
