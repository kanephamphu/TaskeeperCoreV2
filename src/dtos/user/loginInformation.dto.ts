import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginInformation {
    @IsString()
    @MinLength(8)
    @MaxLength(24)
    @IsNotEmpty()
    password: string;

    @IsString()
    readonly facebookToken: string;

    @IsString()
    readonly googleToken: string;
}
