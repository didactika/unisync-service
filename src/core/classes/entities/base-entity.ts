abstract class BaseEntity<T> {
  public readonly id?: number;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(data: Partial<T> & { id?: number; createdAt?: Date; updatedAt?: Date }) {
    this.id = data.id;
    this._createdAt = data.createdAt || new Date();
    this._updatedAt = data.updatedAt || new Date();
  }

  // Getter and setter
  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  set createdAt(value: Date | undefined) {
    this._createdAt = value;
  }

  set updatedAt(value: Date | undefined) {
    this._updatedAt = value;
  }

  abstract toJSON(): T & { id?: number; createdAt?: Date; updatedAt?: Date };

  abstract create(): Promise<T>;

  static async findOne<T>(filter?: Partial<T>): Promise<T | null> {
    throw new Error("The method not implemented in the child class of BaseEntity");
  }

  static async findMany<T>(filter?: Partial<T>): Promise<T[]> {
    throw new Error("Method not implemented in the child class of BaseEntity");
  }

  abstract update(): Promise<T>;

  abstract delete(): Promise<number>;
}

export default BaseEntity;
