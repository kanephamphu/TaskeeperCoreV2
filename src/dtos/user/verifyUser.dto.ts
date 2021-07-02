import { VerificationType } from "enums/user/user.enum";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from "class-validator";

export default class VerifyInformationDto {
    @IsString()
    token: string;

    @IsNumber()
    verifyNumber: number;

    @IsDate()
    timeToLive: Date;

    @IsString()
    @IsEnum(VerificationType)
    verificationType: string;

    @IsBoolean()
    isUsed: boolean = false;
}
