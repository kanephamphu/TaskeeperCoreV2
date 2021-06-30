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
} from "class-validator";

export class UserPhoneNumber {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly ISDCodeId: string;

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

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
