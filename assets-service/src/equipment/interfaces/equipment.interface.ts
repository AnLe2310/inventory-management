export interface Equipment {
    name: string;
    description: string;
    categoryId: string;
    departmentId: string;
    specifications?: object;
    status: string;
    condition: string;
    isActive: boolean;
}