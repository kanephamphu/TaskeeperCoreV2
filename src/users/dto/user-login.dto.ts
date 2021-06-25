import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    readonly loginString: string;

    @IsNotEmpty()
    readonly password: string;
}
