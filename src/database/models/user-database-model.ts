import { Model, Schema } from "mongoose";

interface MUser {

}

const userSchema = new Schema<MUser>({
    
});

export default new Model<MUser>("User", userSchema);
    