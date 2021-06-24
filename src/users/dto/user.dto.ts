import { IsNotEmpty, IsEmail } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    loginString: string;

    // @IsNotEmpty()
    // @IsEmail()
    // email: string;

    createdOn?: Date;
}
