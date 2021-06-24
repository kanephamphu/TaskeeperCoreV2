import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    loginString: String,
    password: String,
});
