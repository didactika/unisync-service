import BaseEntity from "../../../../core/classes/entities/base-entity";
import CourseModuleModel from "../../db/models/course-module-model";
import ICourseModule from "../../types/classes/entities/course-module-interface";

export default class CourseModule extends BaseEntity<ICourseModule> {
    private _courseId: number;
    private _moduleId: number;
    private _instanceId: number;
    private _sectionId: number;
    private _position: number;

    constructor(courseModule: ICourseModule) {
        super(courseModule);
        this._courseId = courseModule.courseId;
        this._moduleId = courseModule.moduleId;
        this._instanceId = courseModule.instanceId;
        this._sectionId = courseModule.sectionId;
        this._position = courseModule.position;
    }

    get courseId(): number {
        return this._courseId;
    }

    set courseId(value: number) {
        this._courseId = value;
    }

    get moduleId(): number {
        return this._moduleId;
    }

    set moduleId(value: number) {
        this._moduleId = value;
    }

    get instanceId(): number {
        return this._instanceId;
    }

    set instanceId(value: number) {
        this._instanceId = value;
    }

    get sectionId(): number {
        return this._sectionId;
    }

    set sectionId(value: number) {
        this._sectionId = value;
    }

    get position(): number {
        return this._position;
    }

    set position(value: number) {
        this._position = value;
    }

    public toJSON(): ICourseModule {
        return {
            id: this.id,
            courseId: this.courseId,
            moduleId: this.moduleId,
            instanceId: this.instanceId,
            sectionId: this.sectionId,
            position: this.position,
        };
    }

    public async create(): Promise<ICourseModule> {
        return (
            await CourseModuleModel.create({
                courseId: this.courseId,
                moduleId: this.moduleId,
                instanceId: this.instanceId,
                sectionId: this.sectionId,
                position: this.position,
            })
        ).toJSON() as ICourseModule;
    }

    public static async findOne<ICourseModule>(filter?: Partial<ICourseModule>): Promise<ICourseModule | null> {
        const courseModule = await CourseModuleModel.findOne(filter ? {where: filter} : {});
        return courseModule ? (courseModule.get({plain: true}) as ICourseModule) : null;
    }

    public static async findMany<ICourseModule>(filter?: Partial<ICourseModule>): Promise<ICourseModule[]> {
        return (await CourseModuleModel.findAll(filter ? {where: filter} : {})).map((module) => module.get({plain: true}) as ICourseModule);
    }

    public async update(): Promise<ICourseModule> {
        const [numberOfAffectedRows, affectedRows] = await CourseModuleModel.update(
            {
                courseId: this.courseId,
                moduleId: this.moduleId,
                instanceId: this.instanceId,
                sectionId: this.sectionId,
                position: this.position,
            },
            {where: {id: this.id}, returning: true}
        );

        if (numberOfAffectedRows === 0) {
            throw new Error("Module not found or no changes detected");
        }

        return affectedRows[0].get({plain: true}) as ICourseModule;
    }

    public async delete(): Promise<number> {
        const numberOfAffectedRows = await CourseModuleModel.destroy({
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