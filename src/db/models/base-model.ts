import { InitOptions, Model, ModelAttributes, ModelStatic, Sequelize } from "sequelize";
import components from "../../config/components.json";
import { ModelError } from "../../errors/db/model-error";
import { Model as ModelType } from "sequelize-typescript";
import { InitializeParams } from "../../types/db/models/initialize-params";

abstract class BaseModel<T extends {} = any, TCreation extends {} = any> extends Model<T, TCreation> {
  static initialize(params: InitializeParams): void {
    throw new Error("Initialize method must be implemented in the child class of BaseModel");
  }

  static init(attributes: ModelAttributes, options: InitOptions<Model> & { componentType: string }): any {
    if (!options.tableName) {
      throw new Error("Table name must be provided");
    }
    const prefix = this.getPrefix(options.componentType);
    const finalOptions: InitOptions<Model> & { componentType: string } = {
      ...options,
      tableName: `${prefix}_${options.tableName.toLowerCase()}`,
    };
    const thisClass = this as any as ModelStatic<ModelType<any, any>>;
    Model.init.call(thisClass, attributes, finalOptions);
  }

  protected static getPrefix(componentType: string): string {
    const { subsystemtypes, systemtypes, plugintypes } = components;

    if (componentType in subsystemtypes) {
      return "core";
    }
    if (componentType in systemtypes) {
      return "system";
    }
    if (componentType in plugintypes) {
      return componentType;
    }
    throw new ModelError(this.name, `Plugin Type '${componentType}' is invalid.`);
  }
}

export default BaseModel;
