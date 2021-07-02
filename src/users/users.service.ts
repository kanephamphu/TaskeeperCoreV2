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
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { VerificationType } from "enums/user/user.enum";

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
        const createdUser = new this.userModel(
            _.assign(createUserDto, { verifyInformation })
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
}
