import EventEmitter from "node:events";
import BaseEvent from "./base-event";

export default abstract class BaseEventEmitter {
  private static eventEmitter: EventEmitter = new EventEmitter();

  public static emitEvent<T extends {} = {}>(event: BaseEvent<T>, ...args: any[]) {
    this.eventEmitter.emit(event.eventName, event, ...args);
  }

  public static onEvent<T extends {} = {}>(eventClass: new (data: T) => BaseEvent<T>, listener: (...args: any[]) => Promise<void> | void) {
    const eventName = eventClass.name;

    this.eventEmitter.on(eventName, async (...args) => {
      try {
        await listener(...args);
      } catch (error) {
        console.error(`Error handling event ${eventName}:`, error);
      }
    });
  }
}
