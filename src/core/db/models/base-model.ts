import { InitOptions, Model, ModelAttributes, ModelStatic, Sequelize } from "sequelize";
import components from "../../../config/components.json";
import { ModelError } from "../../../errors/db/model-error";
import { Model as ModelType } from "sequelize-typescript";
import { EComponentNature } from "../../component/enums/component-nature-enum";
import { VersionInfo } from "../../../types/version-info";
import path from "path";
import { InitializableModel } from "../types/models/base-model";
import DB from "..";

abstract class BaseModel<T extends {} = any, TCreation extends {} = any> extends Model<T, TCreation> {
  private static isInitialized = false;
  protected static requiredModels: (InitializableModel | any)[] = [];
  protected static _sequelize: Sequelize = DB.getInstance().sequelize;

  static initialize(): void {
    throw new Error("Initialize method must be implemented in the child class of BaseModel");
  }

  static init(attributes: ModelAttributes, options: InitOptions<Model>): any {
    if (this.isInitialized) {
      return;
    }
    if (!options.tableName) {
      throw new Error("Table name must be provided");
    }
    this.isInitialized = true;
    const prefix = this.getPrefix(this.getComponentType());
    const finalOptions: InitOptions<Model> = {
      ...options,
      sequelize: options.sequelize,
      tableName: `${prefix}_${options.tableName.toLowerCase()}`,
    };
    const thisClass = this as any as ModelStatic<ModelType<any, any>>;
    this.initializeRequiredModels();
    Model.init.call(thisClass, attributes, finalOptions);
    this.associate();
    this.addHooks();
    this.sequelize?.sync();
  }

  private static initializeRequiredModels(): void {
    for (const model of this.requiredModels) {
      model.initialize();
    }
  }

  private static getPrefix(componentType: string): string {
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

  private static getComponentType(): string {
    try {
      const stack = new Error().stack;
      if (!stack) throw new Error("Stack trace no disponible");

      const stackLines = stack.split("\n");
      const derivedClassLine = stackLines[3];

      const match = derivedClassLine.match(/\((.*):\d+:\d+\)/);
      if (!match) throw new Error("No se pudo determinar la ruta del archivo de la clase derivada");

      const derivedClassPath = match[1];
      const derivedClassDir = path.dirname(derivedClassPath);

      const isCore = derivedClassDir.includes("core");
      if (isCore) return EComponentNature.SYSTEM;
      const versionPath = path.resolve(derivedClassDir, "../../version");
      const versionInfo = require(versionPath) as { default: VersionInfo };
      return versionInfo.default.component.split("_").pop() as string;
    } catch (error) {
      throw new ModelError(this.name, "Component type not found.");
    }
  }

  protected static addHooks(): void {
    // Add hooks here
  }

  protected static associate(): void {
    // Add associations here
  }
}

export default BaseModel;
