import mongoose from "mongoose";

export const RoleSchema = new mongoose.Schema({
    name: String,
    description: String,
}, { timestamps: true });