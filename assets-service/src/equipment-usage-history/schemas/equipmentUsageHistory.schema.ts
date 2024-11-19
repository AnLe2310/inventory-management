import mongoose from "mongoose";

export const EquipmentUsageHistorySchema = new mongoose.Schema({
    equipmentId: String,
    userId: String,
    date: {
        start: Date,
        end: Date,
    },
    condition: {
        before: String,
        after: String,
    },
    isActive: Boolean,
}, { timestamps: true });