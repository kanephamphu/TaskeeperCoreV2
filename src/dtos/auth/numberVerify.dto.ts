import { IsNotEmpty, IsString } from "class-validator";

export class NumberVerifyDto {
    @IsString()
    @IsNotEmpty()
    number: number;

    @IsString()
    @IsNotEmpty()
    readonly userId: string;
}
