import { Schema, Types, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import IUserModel from "../../structures/interfaces/models-interfaces/user-model-interface";
import PasswordHandler from "../../utils/password-handler";

interface MUser extends Omit<IUserModel, "id"> {
    id: Types.ObjectId
}

const userSchema = new Schema<MUser>({
    id: {
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
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        set: (password: string): string => PasswordHandler.EncryptPassword(password)
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

export default model("User", userSchema);
    