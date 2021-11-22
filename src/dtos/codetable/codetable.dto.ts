import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CodeTableDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    codeId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    codeValue: string;

    @IsString()
    @ApiProperty()
    codeDescription: string;
}
