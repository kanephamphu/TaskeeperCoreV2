import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ChangePasswordByTokenDto {
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

    @IsString()
    @IsNotEmpty()
    readonly token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(24)
    password: string;
}
