import {NotFound} from "http-response-client/lib/errors/client";
import {ICategory} from "../../../types/classes/entities/category-interface";
import Campus from "../entities/campus";
import {ICampus} from "../../types/classes/entities/campus-interface";
import Category from "../../../classes/entities/category-entity";

export default class CampusCategoryController {
    
    public static async getFromCampus(campusId: number) {
        const campus = (await Campus.findOne({id: campusId})) as ICampus;
        if (!campus) throw new NotFound({msg: `Campus with id ${campusId} not found`});
        return (await Category.findMany({campusId: campusId})) as ICategory[];
    }
}
