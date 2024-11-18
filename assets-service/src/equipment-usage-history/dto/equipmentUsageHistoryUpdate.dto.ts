export class EquipmentUsageHistoryUpdateDto {
    id: string;
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
}