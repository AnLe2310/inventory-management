import mongoose from "mongoose";

export const EquipmentReportSchema = new mongoose.Schema({
    equipmentId: String,
    userId: String,
    departmentId: String,
    title: String,
    description: String,
    status: String,
    isActive: Boolean,
}, { timestamps: true });

