import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export default class UserRatingDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    targetUserId: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    @Min(1)
    @Max(5)
    point: number;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    message: string;
}
