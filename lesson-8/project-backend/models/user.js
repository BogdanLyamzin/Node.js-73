import {Schema, model} from "mongoose";

import {handleSaveError, validateAtUpdate} from "./hooks.js";

import { emailRegexp } from "../constants/user-constants.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlenth: 6,
        required: true,
    },
}, {versionKey: false, timestamps: true});

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;