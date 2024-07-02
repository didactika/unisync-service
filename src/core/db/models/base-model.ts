import { InitOptions, Model, ModelAttributes, ModelStatic, Sequelize } from "sequelize";
import components from "../../../config/components.json";
import { ModelError } from "../../../errors/db/model-error";
import { Model as ModelType } from "sequelize-typescript";
import { InitializeParams } from "../types/models/initialize-params";
import { EComponentNature } from "../../component/enums/component-nature-enum";

abstract class BaseModel<T extends {} = any, TCreation extends {} = any> extends Model<T, TCreation> {
  findAll(arg0: { where: object; }) {
      throw new Error("Method not implemented.");
  }
  findOne(arg0: { where: object; }) {
      throw new Error("Method not implemented.");
  }
  protected static isInitialized = false;

  static initialize(params: InitializeParams): void {
    throw new Error("Initialize method must be implemented in the child class of BaseModel");
  }

  static init(attributes: ModelAttributes, options: InitOptions<Model> & { componentType: string }): any {
    if (this.isInitialized) {
      return;
    }
    if (!options.tableName) {
      throw new Error("Table name must be provided");
    }
    this.isInitialized = true;
    const prefix = this.getPrefix(options.componentType);
    const finalOptions: InitOptions<Model> & { componentType: string } = {
      ...options,
      tableName: `${prefix}_${options.tableName.toLowerCase()}`,
    };
    const thisClass = this as any as ModelStatic<ModelType<any, any>>;
    Model.init.call(thisClass, attributes, finalOptions);
    this.sequelize?.sync();
  }

  protected static getPrefix(componentType: string): string {
    const { subsystemtypes, systemtypes, plugintypes } = components;

    if (componentType in subsystemtypes) {
      return "core";
    }
    if (componentType in systemtypes || componentType === EComponentNature.SYSTEM) {
      return "system";
    }
    if (componentType in plugintypes) {
      return componentType;
    }
    throw new ModelError(this.name, `Plugin Type '${componentType}' is invalid.`);
  }

  protected static addHooks(): void {
    // Add hooks here
  }
}

export default BaseModel;
