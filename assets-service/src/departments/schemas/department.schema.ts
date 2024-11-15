import mongoose from "mongoose";

export const DepartmentSchema = new mongoose.Schema({
    name: String,
    description: String,
    isActive: Boolean,
}, { timestamps: true });