import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class GetWallPostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

    @IsNumber()
    @Min(0)
    @Max(10)
    @ApiProperty()
    @IsNotEmpty()
    limit: number;

    @IsNumber()
    @Min(0)
    @Max(10)
    @ApiProperty()
    @IsNotEmpty()
    offset: number;
}
