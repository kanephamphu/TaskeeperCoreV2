import VerifyInformationDto from "dtos/user/verifyUser.dto";
import { VerificationType } from "enums/user/user.enum";
import { addDays, addMinutes } from "shared/utils/dateHelper";
import * as Str from "@supercharge/strings";

export const buildVerificationInformation = (
    verificationType: VerificationType
): VerifyInformationDto => {
    const verificationInformationDto = new VerifyInformationDto();
    verificationInformationDto.token = Str.random();
    verificationInformationDto.verifyNumber =
        1000 + Math.floor(Math.random() * 10000);
    verificationInformationDto.tokenTimeToLive = addDays(new Date(), 1);
    verificationInformationDto.numberTimeToLive = addMinutes(new Date(), 2);
    verificationInformationDto.verificationType = verificationType;

    return verificationInformationDto;
};
