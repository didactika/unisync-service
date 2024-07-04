export interface IBaseEvent<GenericObject> {
    uuid: string;
    timestamp: Date;
    data: T;
}