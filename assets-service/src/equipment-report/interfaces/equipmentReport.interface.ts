export interface EquipmentReport {
    equipmentId: string;
    userId: string;
    departmentId: string;
    title: string;
    description: string;
    status: string;
    isActive: boolean;
    createAt?: Date
    updateAt?: Date
}