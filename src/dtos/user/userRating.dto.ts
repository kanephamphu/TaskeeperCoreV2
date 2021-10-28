import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export default class UserRatingDto {
    @IsString()
    @IsNotEmpty()
    targetUserId: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    point: number;

    @IsString()
    @IsNotEmpty()
    message: string;
}
