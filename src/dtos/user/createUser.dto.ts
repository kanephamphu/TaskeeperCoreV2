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
    IsOptional,
} from "class-validator";
import { LoginInformation } from "dtos/user/loginInformation.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserPhoneNumber {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    readonly ISD_CodeId: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    readonly phoneNumber: string;
}

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string;

    @IsString()
    @MaxLength(30)
    @ApiProperty()
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    readonly email: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    @IsPositive()
    readonly dayOfBirth: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    @IsPositive()
    readonly monthOfBirth: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    @IsPositive()
    readonly yearOfBirth: number;

    @IsNotEmptyObject()
    @ApiProperty()
    readonly phoneNumber: UserPhoneNumber;

    @IsString()
    @MaxLength(8)
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Gender)
    readonly gender: string;

    @IsUrl()
    @ApiProperty()
    @IsOptional()
    readonly avatar?: string;

    @IsObject()
    @IsNotEmpty()
    @ApiProperty()
    readonly loginInformation: LoginInformation;
}
