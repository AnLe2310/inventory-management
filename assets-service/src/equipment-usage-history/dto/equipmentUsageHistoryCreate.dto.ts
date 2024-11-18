export class EquipmentUsageHistoryCreateDto {
    equipmentId: string;
    userId: string;
    date: {
        start: Date;
        end: Date;
    };
    condition: {
        before: string;
        alter: string;
    };
    isActive: boolean;
    createAt: Date;
    updateAt: Date;
}