import {
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsString,
} from "class-validator";
import { LoginInformation } from "dtos/user/loginInformation.dto";

export default class UserLoginDto {
    @IsObject()
    @IsNotEmptyObject()
    loginInformation: LoginInformation;

    @IsString()
    @IsNotEmpty()
    loginString: string;
}
