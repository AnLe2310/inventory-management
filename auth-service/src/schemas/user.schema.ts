import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    isActive: Boolean,
    refreshToken: String,
}, { timestamps: true });