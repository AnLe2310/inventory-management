import { ApiProperty } from "@nestjs/swagger";

export class EquipmentUsageHistoryUpdateDTO {
    @ApiProperty({example: "673aba178fba41ff1c889693"})
    id: string;

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
}