import { Schema, Types, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import {IMUser} from "../../structures/types/database-schemas-types/user-schema-types";
import UserModelMiddleware from "./middlewares/user-model-middleware";

/**
 * @description Mongoose User Schema
 */
const userSchema = new Schema<IMUser>({
    _id: {
        type: Schema.ObjectId,
        required: true,
        default: new Types.ObjectId()
    },
    uuid: {
        type: String,
        required: true,
        default: uuidv4()
    },
    username: {
        type: String,
        required: [true, 'The username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
}, { versionKey: false });

/**
 * @description Mongoose User Schema Middlewares
 */
UserModelMiddleware.applyAll(userSchema);

export default model('User', userSchema);