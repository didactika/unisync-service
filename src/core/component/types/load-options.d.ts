import { LoadPathEnum } from "../enums/load-path-enum";

/**
 * Interface representing the options for loading components.
 */
export interface LoadOptions {
    /**
     * The directory to search for components.
     */
    directory?: string;

    /**
     * Path to the directory to search for components.
     */
    directoryPath?: LoadPathEnum;

    /**
     * The component directories to search for.
     */
    componentDirectories?: string[];

    /**
     * The components to search for.
     */
    componentsToSearch?: string[];
  
    /**
     * The method to call on the components.
     */
    method?: string;
  
    /**
     * The parameters to pass to the method.
     */
    params?: object[] | object;
  
    /**
     * Whether to include the component type as a parameter.
     */
    componentTypeParam?: boolean;
  
    /**
     * Whether to return the loaded files.
     */
    returnFiles?: boolean;
  
    /**
     * A specific file to load.
     */
    specificFile?: string;
  }
  