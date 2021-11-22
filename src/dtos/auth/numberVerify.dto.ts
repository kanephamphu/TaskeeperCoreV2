import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NumberVerifyDto {
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly number: number;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly userId: string;
}
