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
    IsBoolean,
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

export class CommonPermission {
    @IsBoolean()
    @ApiProperty()
    create: boolean;

    @IsBoolean()
    @ApiProperty()
    read: boolean;

    @IsBoolean()
    @ApiProperty()
    update: boolean;

    @IsBoolean()
    @ApiProperty()
    delete: boolean;

    @IsBoolean()
    @ApiProperty()
    manage: boolean;
}

export class Permission {
    @ApiProperty()
    post: CommonPermission;

    @ApiProperty()
    user: CommonPermission;

    @ApiProperty()
    moneyTransaction: CommonPermission;
}

export class EditUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    _id: string;

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

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
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

    @IsString()
    @MaxLength(8)
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Gender)
    readonly gender: string;

    @IsOptional()
    @ApiProperty()
    readonly permissions: Permission;
}
