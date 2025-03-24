import BaseEntity from "../../../../core/classes/entities/base-entity";
import GroupingModel from "../../db/models/grouping-model";
import {GroupingFilter} from "../../types/classes/entities/grouping-filter";
import {IGrouping} from "../../types/classes/entities/grouping-interface";

export default class Grouping extends BaseEntity<IGrouping> implements IGrouping {
    private _idnumber?: string;
    private _name: string;
    private _courseId: number;
    private _idOnCampus?: number;

    constructor(grouping: IGrouping) {
        super(grouping);
        this._name = grouping.name;
        this._courseId = grouping.courseId;
        this._idnumber = grouping.idnumber;
        this._idOnCampus = grouping.idOnCampus;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    //Getters
    get idnumber(): string | undefined {
        return this._idnumber;
    }

    set idnumber(value: string | undefined) {
        this._idnumber = value;
    }

    //Setters

    get idOnCampus(): number | undefined {
        return this._idOnCampus;
    }

    set idOnCampus(value: number | undefined) {
        this._idOnCampus = value;
    }

    get courseId(): number {
        return this._courseId;
    }

    set courseId(value: number) {
        this._courseId = value;
    }

    public toJSON(): IGrouping {
        return {
            id: this.id,
            idnumber: this._idnumber,
            name: this._name,
            courseId: this._courseId,
            idOnCampus: this._idOnCampus,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public async create(): Promise<IGrouping> {
        return (
            await GroupingModel.create({
                idnumber: this._idnumber,
                name: this._name,
                courseId: this._courseId,
                idOnCampus: this._idOnCampus,
            })
        ).dataValues as IGrouping;
    }

    public static async findOne<IGrouping>(filter?: GroupingFilter): Promise<IGrouping | null> {
        const grouping = await GroupingModel.findOne(filter ? {where: filter} : {});
        return grouping ? (grouping as IGrouping) : null;
    }

    public static async findMany<IGrouping>(filter?: GroupingFilter): Promise<IGrouping[]> {
        return (await GroupingModel.findAll(filter ? {where: filter} : {})).map((grouping) => grouping.dataValues as IGrouping);
    }

    public async update(): Promise<IGrouping> {
        const [numberOfAffectedRows, affectedRows] = await GroupingModel.update(
            {
                idnumber: this._idnumber,
                name: this._name,
                courseId: this._courseId,
                idOnCampus: this._idOnCampus,
            },
            {where: {id: this.id}, returning: true}
        );

        if (numberOfAffectedRows === 0) {
            throw new Error("Course not found or no changes detected");
        }

        return affectedRows[0].get({plain: true}) as IGrouping;
    }

    public async delete(): Promise<number> {
        const numberOfAffectedRows = await GroupingModel.destroy({
            where: {
                id: this.id,
            },
        });

        if (numberOfAffectedRows === 0) {
            throw new Error("Grouping not found");
        }

        return numberOfAffectedRows;
    }
}
