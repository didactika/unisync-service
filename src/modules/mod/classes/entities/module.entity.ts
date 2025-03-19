import BaseEntity from "../../../../core/classes/entities/base-entity";
import ModuleModel from "../../db/models/module-model";
import IModule from "../../types/classes/entities/module-entity-interface";

export default class Module extends BaseEntity<IModule> {
    constructor(mod: IModule) {
        super(mod);
        this._name = mod.name;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    public static async findOne<IModule>(filter?: Partial<IModule>): Promise<IModule | null> {
        const module = await ModuleModel.findOne(filter ? {where: filter} : {});
        return module ? (module.get({plain: true}) as IModule) : null;
    }

    public static async findMany<IModule>(filter?: Partial<IModule>): Promise<IModule[]> {
        return (await ModuleModel.findAll(filter ? {where: filter} : {})).map((module) => module.get({plain: true}) as IModule);
    }

    public toJSON(): IModule {
        return {
            id: this.id,
            name: this.name,
        };
    }

    public async create(): Promise<IModule> {
        return (
            await ModuleModel.create({
                name: this.name,
            })
        ).toJSON() as IModule;
    }

    public async update(): Promise<IModule> {
        const [numberOfAffectedRows, affectedRows] = await ModuleModel.update(
            {
                name: this.name,
            },
            {where: {id: this.id}, returning: true}
        );

        if (numberOfAffectedRows === 0) {
            throw new Error("Module not found or no changes detected");
        }

        return affectedRows[0].get({plain: true}) as IModule;
    }

    public async delete(): Promise<number> {
        const numberOfAffectedRows = await ModuleModel.destroy({
            where: {
                id: this.id,
            },
        });

        if (numberOfAffectedRows === 0) {
            throw new Error("Module not found");
        }

        return numberOfAffectedRows;
    }
}