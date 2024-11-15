import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
    name: String,
    description: String,
    isActive: Boolean,
}, { timestamps: true });