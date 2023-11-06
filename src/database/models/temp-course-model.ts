import { Schema, model } from "mongoose";
const tempCourseSchema = new Schema({}, { versionKey: false, strict: false });

export default model('TempCourse', tempCourseSchema);