import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsString,
} from "class-validator";
import { LoginInformation } from "dtos/user/loginInformation.dto";

export default class UserLoginDto {
    @IsObject()
    @ApiProperty()
    @IsNotEmptyObject()
    loginInformation: LoginInformation;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    loginString: string;
}
