import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roleId: String,
    isActive: Boolean,
}, { timestamps: true });