import { v4 as uuidv4 } from "uuid";
import { IBaseEvent } from "../types/events/base-event";

export default abstract class BaseEvent<T extends {}> implements IBaseEvent<T> {
  private _eventName: string;
  private _uuid: string;
  private _timestamp: Date;
  private _data: T;

  constructor(data: object = {}) {
    this._eventName = this.constructor.name;
    this._uuid = uuidv4();
    this._timestamp = new Date();
    this._data = data as T;
  }

  // Getters
  get eventName(): string {
    return this._eventName;
  }

  get uuid(): string {
    return this._uuid;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get data(): T {
    return this._data;
  }
}
