/**
 * @typedef {Object} VersionInfo
 * @property {string} component - The name of the component.
 * @property {string} version - The version of the component.
 * @property {string} [release] - The release date of the component.
 * @property {Array<{module: string, version: string}>} [requirements] - The requirements of the component.
 * @property {string} [branch] - The branch of the component.
 */
export type VersionInfo = {
  component: string;
  version: string;
  release?: string;
  requirements?: Array<{
    module: string;
    version: string;
  }>;
  branch?: string;
};
