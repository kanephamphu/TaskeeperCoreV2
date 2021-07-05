import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NumberVerifyDto {
    @IsNumber()
    @IsNotEmpty()
    readonly number: number;

    @IsString()
    @IsNotEmpty()
    readonly userId: string;
}
