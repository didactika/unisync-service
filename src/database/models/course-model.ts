import { Schema, Types, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { IMCourse } from "../../structures/types/database-schemas-types/course-schema-types";
import { CourseStatus } from "../../structures/types/models-classes-types/courses-class-types";
import CourseModelMiddleware from "./middlewares/course-model-middleware";
import CourseStatusModelMiddleware from "./middlewares/course-status-model-middleware";

/**
 * @description Mongoose Course Status Schema
 */
const courseStatusSchema = new Schema<CourseStatus>({}, { _id: false, versionKey: false, strict: false });


/**
 * @description Mongoose Course Schema
 */
const courseSchema = new Schema<IMCourse>({
    _id: {
        type: Schema.ObjectId,
        required: true,
        default: new Types.ObjectId()
    },
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4()
    },
    idOnCampus: {
        type: Number,
        required: [true, 'ID on campus is required'],
    },
    campus: {
        type: Schema.ObjectId,
        required: [true, 'Campus is required'],
        ref: 'Campus'
    },
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
    },
    shortname: {
        type: String,
        required: [true, 'Shortname is required'],
        trim: true
    },
    status: {
        type: courseStatusSchema,
        required: [true, 'Status is required'],
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
}, { versionKey: false });

/**
 * @description Mongoose Course Schema Middlewares
 */
CourseModelMiddleware.applyAll(courseSchema);

/**
 * @description Mongoose Course Status Schema Middlewares
 */
CourseStatusModelMiddleware.applyAll(courseStatusSchema);

export default model('Course', courseSchema);