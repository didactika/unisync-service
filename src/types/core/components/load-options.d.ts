/**
 * Interface representing the options for loading components.
 */
export interface LoadOptions {
    /**
     * The directory to search for components.
     */
    directory?: string;

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
  