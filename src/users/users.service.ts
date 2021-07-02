import { AccountStatus } from "enums/user/user.enum";
import { compareDateTime, COMPARE_TYPE } from "shared/utils/dateHelper";
import { getLanguageCodeByISDCode } from "shared/utils/codeTableHelper";
import { buildVerificationInformation } from "shared/querybuilder/verifyInformation.builder";
import { buildJwtPayload } from "shared/utils/authHelper";
import { hashPassword, comparePasswords } from "shared/utils/stringHelper";
import { buildLoginQuery } from "shared/querybuilder/userQuery.builder";
import UserLoginDto from "dtos/user/login.dto";
import { CreateUserDto } from "dtos/user/createUser.dto";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "schemas/user/user.schema";
import { Error, Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { VerificationType } from "enums/user/user.enum";
import { ErrorMessage } from "enums/message/message.enum";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private jwtService: JwtService
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
                    user.verifyInformation.timeToLive,
                    COMPARE_TYPE.SMALLER_OR_EQUAL
                ) &&
                user.accountStatus === AccountStatus.INACTIVE
            ) {
                if (user.verifyInformation.token === token) {
                    user.verifyInformation.isUsed = true;
                    user.accountStatus = AccountStatus.FIRST_TIME;
                    await this.userModel.updateOne({ _id: userId }, user);
                } else {
                    throw new Error(ErrorMessage.WRONG_TOKEN);
                }
            } else {
                throw new Error(ErrorMessage.TOKEN_EXPIRED);
            }
        } else {
            throw new Error(ErrorMessage.NOT_FOUND);
        }

        return true;
    }
}
