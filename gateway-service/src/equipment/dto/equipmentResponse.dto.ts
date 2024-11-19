import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export class EquipmentResponseDTO {
    @ApiProperty({ example: "6739f055d58a34a294ba6840" })
    _id: string;

    @ApiProperty({ example: "Laptop" })
    name: string;

    @ApiProperty({ example: "The description equipment" })
    description: string;

    @ApiProperty({ example: "6736f5d65dad13c26754b0d9" })
    categoryId: string;

    @ApiProperty({ example: "6736cb3bb9a808891d124fa0" })
    departmentId: string;

    @ApiProperty({ example: { cpu: 'Intel Core i7', ram: '16GB', ssd: '512GB', hdd: '1TB' }, required: false })
    specifications?: object;

    @ApiProperty({ enum: ['Available', 'In use', 'Maintenance'], example: 'Available' })
    @IsEnum(['Available', 'In use', 'Maintenance'])
    status: string;

    @ApiProperty({ enum: ['New', 'Good', 'Fair', 'Poor'], example: 'New' })
    @IsEnum(['New', 'Good', 'Fair', 'Poor'])
    condition: string;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: new Date().toISOString() })
    createAt?: Date;

    @ApiProperty({ example: new Date().toISOString() })
    updateAt?: Date;
}