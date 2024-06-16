import { BaseError } from "../base-error";


export class ModelError extends BaseError {
  constructor(modelName: string, description: string) {
    super(400, `Error installing model ${modelName}`, { description });
    this.name = 'ModelError';
  }
}
