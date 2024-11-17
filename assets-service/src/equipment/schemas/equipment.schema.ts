import mongoose from "mongoose";

export const EquipmentSchema = new mongoose.Schema({
    name: String,
    description: String,
    categoryId: String,
    departmentId: String,
    specifications: Object,
    status: String,
    condition: String,
    isActive: String,
}, { timestamps: true });