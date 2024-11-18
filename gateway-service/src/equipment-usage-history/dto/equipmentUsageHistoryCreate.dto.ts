import { ApiProperty } from "@nestjs/swagger";

export class EquipmentUsageHistoryCreateDTO {
    @ApiProperty({ example: "6739f055d58a34a294ba6840" })
    equipmentId: string;

    @ApiProperty({ example: "67355face20f610c21fb52f8" })
    userId: string;

    @ApiProperty({ example: { start: new Date().toISOString(), end: new Date().toISOString() } })
    date: {
        start: Date;
        end: Date;
    };

    @ApiProperty({ example: { before: "New", after: "New" } })
    condition: {
        before: string;
        alter: string;
    };

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ required: false })
    createAt: Date;

    @ApiProperty({ required: false })
    updateAt: Date;
}