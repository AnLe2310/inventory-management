export class EquipmentCreateDTO {
    name: string;
    description: string;
    categoryId: string;
    departmentId: string;
    specifications?: object;
    status: string;
    condition: string;
    isActive: boolean;
    createAt?: Date;
    updateAt?: Date;
}