/**
 * Interface representing the configuration for components.
 */
export interface ComponentConfig {
    [key: string]: {
      [plugin: string]: string;
    };
  }
  