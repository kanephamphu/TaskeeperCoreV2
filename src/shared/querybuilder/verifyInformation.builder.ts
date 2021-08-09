import { Permissions } from "schemas/user/permission.schema";
import VerifyInformationDto from "dtos/user/verifyUser.dto";
import { VerificationType, VerifyNumberRange } from "enums/user/user.enum";
import { addDays, addMinutes } from "shared/utils/dateHelper";
import * as Str from "@supercharge/strings";
import { CommonPermission } from "schemas/user/commonPermission.schema";

export const buildVerificationInformation = (
    verificationType: VerificationType
): VerifyInformationDto => {
    const verificationInformationDto = new VerifyInformationDto();
    verificationInformationDto.token = Str.random();
    verificationInformationDto.verifyNumber =
        Math.floor(
            Math.random() * (VerifyNumberRange.MAX - VerifyNumberRange.MIN + 1)
        ) + VerifyNumberRange.MIN;
    verificationInformationDto.tokenTimeToLive = addDays(new Date(), 1);
    verificationInformationDto.numberTimeToLive = addMinutes(new Date(), 2);
    verificationInformationDto.verificationType = verificationType;

    return verificationInformationDto;
};

export const buildInitialPermissions = (): Permissions => {
    const permissions = new Permissions();
    const commonPermission = buildCommonPermission();
    permissions.user = commonPermission;
    permissions.post = commonPermission;
    permissions.moneyTransaction = commonPermission;

    return permissions;
};

const buildCommonPermission = (): CommonPermission => {
    const commonPermission = new CommonPermission();
    commonPermission.create = true;
    commonPermission.read = true;
    commonPermission.update = true;
    commonPermission.delete = true;
    commonPermission.manage = false;

    return commonPermission;
};
