import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDto {
    @IsString()
    @IsNotEmpty()
    forgotPasswordString: number;
}
