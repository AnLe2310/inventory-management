import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export class EquipmentUpdateDTO {
    @ApiProperty({ example: "67355face20f610c21fb52f8" })
    id: string;

    @ApiProperty({ example: "Laptop", required: false })
    name: string;

    @ApiProperty({ example: "The description equipment", required: false })
    description: string;

    @ApiProperty({ example: "67355face20f610c21fb52f8", required: false })
    categoryId: string;

    @ApiProperty({ example: "67355face20f610c21fb52f8", required: false })
    departmentId: string;

    @ApiProperty({ example: { cpu: 'Intel Core i7', ram: '16GB', ssd: '512GB', hdd: '1TB' }, required: false })
    specifications?: object;

    @ApiProperty({ enum: ['Available', 'In use', 'Maintenance'], example: 'Available' })
    @IsEnum(['Available', 'In use', 'Maintenance'])
    status: string;

    @ApiProperty({ enum: ['New', 'Good', 'Fair', 'Poor'], example: 'New' })
    @IsEnum(['New', 'Good', 'Fair', 'Poor'])
    condition: string;

    @ApiProperty({ example: true, required: false })
    isActive: boolean;
}