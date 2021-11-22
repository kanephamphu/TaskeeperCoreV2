import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class GetNewsFeedPostDto {
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
