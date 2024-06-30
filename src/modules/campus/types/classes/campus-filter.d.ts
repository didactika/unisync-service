/**
 * @typedef {Object} CampusFilter
 * @property {string} [name] - The name of the campus.
 * @property {string} [url] - The url of the campus.
 * @property {string} [token] - The token of the campus.
 * @property {string} [version] - The version of the campus.
 * @property {string} [createdAt] - The creation date of the campus.
 * @property {string} [updatedAt] - The update date of the campus.
 * @property {string} [id] - The id of the campus.
 * @property {string} [uuid] - The uuid of the campus.
 */
export type CampusFilter = {
  name?: string;
  url?: string;
  token?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  uuid?: string;
};