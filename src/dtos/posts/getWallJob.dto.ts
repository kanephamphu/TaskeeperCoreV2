import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class GetWallPostDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    @Min(0)
    @Max(10)
    @IsNotEmpty()
    limit: number;

    @IsNumber()
    @Min(0)
    @Max(10)
    @IsNotEmpty()
    offset: number;
}
