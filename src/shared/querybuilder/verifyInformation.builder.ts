import VerifyInformationDto from "dtos/user/verifyUser.dto";
import { VerificationType } from "enums/user/user.enum";
import { addDays } from "shared/utils/dateHelper";
import * as Str from "@supercharge/strings";

export const buildVerificationInformation = (
    verificationType: VerificationType
): VerifyInformationDto => {
    const verificationInformationDto = new VerifyInformationDto();
    verificationInformationDto.token = Str.random();
    verificationInformationDto.verifyNumber = Math.floor(
        Math.random() * 10000
    ).toString();
    verificationInformationDto.timeToLive = addDays(new Date(), 1);
    verificationInformationDto.verificationType = verificationType;

    return verificationInformationDto;
};
