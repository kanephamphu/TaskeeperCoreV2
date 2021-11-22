import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class GetNewsFeedPostDto {
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
