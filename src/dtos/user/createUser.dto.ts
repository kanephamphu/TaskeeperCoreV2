import { Gender } from "enums/user/user.enum";
import {
    MaxLength,
    IsNotEmpty,
    IsEmail,
    IsString,
    IsEnum,
    IsNumber,
    IsNotEmptyObject,
    IsPositive,
    MinLength,
    IsObject,
    IsUrl,
} from "class-validator";
import { LoginInformation } from "dtos/user/loginInformation.dto";

export class UserPhoneNumber {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly ISD_CodeId: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly phoneNumber: string;
}

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly dayOfBirth: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly monthOfBirth: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly yearOfBirth: number;

    @IsNotEmptyObject()
    readonly phoneNumber: UserPhoneNumber;

    @IsString()
    @MaxLength(8)
    @IsNotEmpty()
    @IsEnum(Gender)
    readonly gender: string;

    @IsUrl()
    readonly avatar?: string;

    @IsObject()
    @IsNotEmpty()
    readonly loginInformation: LoginInformation;
}
