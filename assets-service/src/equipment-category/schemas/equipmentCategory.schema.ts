import mongoose from "mongoose";

export const EquipmentCategorySchema = new mongoose.Schema({
    name: String,
    description: String,
    isActive: Boolean,
}, { timestamps: true });