import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDto {
    @IsString()
    @IsNotEmpty()
    forgotString: number;
}
