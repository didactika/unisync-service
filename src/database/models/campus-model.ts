import { Schema, Types, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import IMCampus from "../../structures/types/database-schemas-types/campus-schema-types";
import CampusModelMiddleware from "./middlewares/campus-model-middleware";

/**
 * @description Mongoose Campus Schema
 */
const campusSchema = new Schema<IMCampus>({
    _id: {
        type: Schema.ObjectId,
        required: true,
        default: new Types.ObjectId()
    },
    uuid: {
        type: String,
        required: [true, 'UUID is required'],
        unique: true,
        default: uuidv4()
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    url: {
        type: String,
        required: [true, 'URL is required'],
        unique: true
    },
    token: {
        type: String,
        required: [true, 'Token is required'],
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

/**
 * @description Mongoose Campus Schema Middlewares
 */
campusSchema.pre('save', CampusModelMiddleware.validateUrl);
campusSchema.post('save', CampusModelMiddleware.isDuplicatedData);

export default model('Campus', campusSchema);