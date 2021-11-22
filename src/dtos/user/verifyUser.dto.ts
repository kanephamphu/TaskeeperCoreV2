import { VerificationType } from "enums/user/user.enum";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class VerifyInformationDto {
    @IsString()
    @ApiProperty()
    token: string;

    @IsNumber()
    @ApiProperty()
    verifyNumber: number;

    @IsDate()
    @ApiProperty()
    tokenTimeToLive: Date;

    @IsDate()
    @ApiProperty()
    numberTimeToLive: Date;

    @IsString()
    @ApiProperty()
    @IsEnum(VerificationType)
    verificationType: string;

    @IsBoolean()
    @ApiProperty()
    isUsed: boolean = false;
}
