import { IsObject, IsString } from "class-validator";
import { LoginInformation } from "dtos/user/loginInformation.dto";

export default class UserLoginDto {
    @IsObject()
    loginInformation: LoginInformation;

    @IsString()
    loginString: string;
}
