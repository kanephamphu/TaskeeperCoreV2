import { ChangePasswordByTokenDto } from "dtos/auth/changePasswordByToken.dto";
import { MailService } from "mail/mail.service";
import { ForgotPasswordDto } from "dtos/auth/forgotPassword.dto";
import { AccountStatus } from "enums/user/user.enum";
import { compareDateTime, COMPARE_TYPE } from "shared/utils/dateHelper";
import { getLanguageCodeByISDCode } from "shared/utils/codeTableHelper";
import { buildVerificationInformation } from "shared/querybuilder/verifyInformation.builder";
import { buildJwtPayload } from "shared/utils/authHelper";
import { hashPassword, comparePasswords } from "shared/utils/stringHelper";
import {
    buildLoginQuery,
    buildForgotPasswordQuery,
} from "shared/querybuilder/userQuery.builder";
import UserLoginDto from "dtos/user/login.dto";
import { CreateUserDto } from "dtos/user/createUser.dto";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "schemas/user/user.schema";
import { Error, Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { VerificationType } from "enums/user/user.enum";
import { ERROR_MESSAGE, COMMON_MESSAGE } from "enums/message/message.enum";
import { NumberVerifyDto } from "dtos/auth/numberVerify.dto";
import { truncate } from "fs/promises";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private jwtService: JwtService,
        private mailService: MailService
    ) {}

    public async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.loginInformation.password = await hashPassword(
            createUserDto.loginInformation.password
        );
        const verifyInformation = buildVerificationInformation(
            VerificationType.REGISTER
        );
        const languageCode = getLanguageCodeByISDCode(
            createUserDto.phoneNumber.ISD_CodeId
        );
        const createdUser = new this.userModel(
            _.assign(createUserDto, { verifyInformation, languageCode })
        );

        return createdUser.save();
    }

    public async login(userLoginDto: UserLoginDto): Promise<any> {
        const loginQuery = buildLoginQuery(userLoginDto);
        const user = await this.userModel.findOne(loginQuery);
        let isValidate = true;

        if (
            !userLoginDto.loginInformation.facebookToken &&
            !userLoginDto.loginInformation.googleToken
        ) {
            isValidate = await comparePasswords(
                userLoginDto.loginInformation.password,
                user.loginInformation.password
            );
        }

        if (isValidate) {
            const payload = buildJwtPayload(user);

            const resData = {
                access_token: this.jwtService.sign(payload),
            };

            return resData;
        }

        return;
    }

    public async verifyAccountByToken(
        token: string,
        userId: string
    ): Promise<boolean | Error> {
        let user = await this.userModel.findById(userId);

        if (user) {
            if (
                compareDateTime(
                    new Date(),
                    user.verifyInformation.tokenTimeToLive,
                    COMPARE_TYPE.SMALLER_OR_EQUAL
                ) &&
                user.accountStatus === AccountStatus.INACTIVE
            ) {
                if (user.verifyInformation.token === token) {
                    user.verifyInformation.isUsed = true;
                    user.accountStatus = AccountStatus.FIRST_TIME;
                    await this.userModel.updateOne({ _id: userId }, user);
                } else {
                    throw new Error(ERROR_MESSAGE.WRONG_TOKEN);
                }
            } else {
                throw new Error(ERROR_MESSAGE.TOKEN_EXPIRED);
            }
        } else {
            throw new Error(ERROR_MESSAGE.NOT_FOUND);
        }

        return true;
    }

    public async verifyAccountByNumber(
        number: number,
        userId: string
    ): Promise<boolean | Error> {
        let user = await this.userModel.findById(userId);

        if (user) {
            if (
                compareDateTime(
                    new Date(),
                    user.verifyInformation.numberTimeToLive,
                    COMPARE_TYPE.SMALLER_OR_EQUAL
                ) &&
                user.accountStatus === AccountStatus.INACTIVE &&
                user.verifyInformation.verificationType ===
                    VerificationType.REGISTER
            ) {
                if (user.verifyInformation.verifyNumber === number) {
                    user.verifyInformation.isUsed = true;
                    user.accountStatus = AccountStatus.FIRST_TIME;
                    await this.userModel.updateOne({ _id: userId }, user);
                } else {
                    throw new Error(ERROR_MESSAGE.WRONG_NUMBER);
                }
            } else {
                throw new Error(ERROR_MESSAGE.NUMBER_EXPIRED);
            }
        } else {
            throw new Error(ERROR_MESSAGE.NOT_FOUND);
        }

        return true;
    }

    public async handleForgotPassword(
        forgotPasswordDto: ForgotPasswordDto
    ): Promise<string | Error> {
        const forgotPasswordQuery = buildForgotPasswordQuery(forgotPasswordDto);
        const user = await this.userModel.findOne(forgotPasswordQuery);
        const userId = user._id;

        if (user) {
            const verifyInformation = buildVerificationInformation(
                VerificationType.FORGOT_PASSWORD
            );
            await this.userModel.updateOne(
                { _id: userId },
                { verifyInformation }
            );
            const updatedUser = await this.userModel.findById(userId);

            this.mailService.sendForgotPasswordEmail(updatedUser);

            return user._id;
        }

        throw new Error(COMMON_MESSAGE.FAILED);
    }

    public async checkVerifyNumber(
        numberVerifyDto: NumberVerifyDto
    ): Promise<string | Error> {
        const user = await this.userModel.findById(numberVerifyDto.userId);

        if (user) {
            if (
                compareDateTime(
                    new Date(),
                    user.verifyInformation.numberTimeToLive,
                    COMPARE_TYPE.SMALLER_OR_EQUAL
                )
            ) {
                if (
                    user.verifyInformation.verifyNumber ===
                    numberVerifyDto.number
                ) {
                    return user.verifyInformation.token;
                }

                throw new Error(ERROR_MESSAGE.WRONG_NUMBER);
            }

            throw new Error(ERROR_MESSAGE.NUMBER_EXPIRED);
        }

        throw new Error(COMMON_MESSAGE.USER_NOTFOUND);
    }

    public async changePasswordByToken(
        changePasswordByTokenDto: ChangePasswordByTokenDto
    ) {
        const user = await this.userModel.findById(
            changePasswordByTokenDto.userId
        );

        if (user) {
            if (
                compareDateTime(
                    new Date(),
                    user.verifyInformation.tokenTimeToLive,
                    COMPARE_TYPE.SMALLER_OR_EQUAL
                ) &&
                user.verifyInformation.isUsed === false
            ) {
                if (
                    user.verifyInformation.token ===
                        changePasswordByTokenDto.token &&
                    user.verifyInformation.verificationType ===
                        VerificationType.FORGOT_PASSWORD
                ) {
                    const hashedPassword = await hashPassword(
                        changePasswordByTokenDto.password
                    );

                    await this.userModel.updateOne(
                        { _id: changePasswordByTokenDto.userId },
                        {
                            "loginInformation.password": hashedPassword,
                            "verifyInformation.isUsed": true,
                        }
                    );

                    return user._id;
                }

                throw new Error(ERROR_MESSAGE.WRONG_TOKEN);
            }

            throw new Error(ERROR_MESSAGE.TOKEN_EXPIRED);
        }

        throw new Error(COMMON_MESSAGE.USER_NOTFOUND);
    }
}
