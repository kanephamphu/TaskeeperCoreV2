import { VerificationType } from "enums/user/user.enum";
import { IsDate, IsEnum, IsString } from "class-validator";

export default class VerifyInformationDto {
    @IsString()
    token: string;

    @IsString()
    verifyNumber: string;

    @IsDate()
    timeToLive: Date;

    @IsString()
    @IsEnum(VerificationType)
    verificationType: string;
}
