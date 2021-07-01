import UserLoginDto from "dtos/user/login.dto";
import { CreateUserDto } from "dtos/user/createUser.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtPayload } from "auth/interfaces/payload.interface";
//import { toUserDto } from "shared/mapper/users/users.mapper";
import { comparePasswords } from "shared/utils/stringHelper";
import _ from "lodash";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "schemas/user/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    public async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);

        return createdUser.save();
    }

    public async login(userLoginDto: UserLoginDto): Promise<User> {
        const loginQuery = this.buildLoginQuery(userLoginDto);
        const user = await this.userModel.findOne(loginQuery);

        return user;
    }

    private buildLoginQuery(userLoginDto: UserLoginDto): any {
        const facebookTokenLogin = {
            loginInformation: {
                facebookToken: userLoginDto.loginInformation.facebookToken,
            },
        };
        const googleTokenLogin = {
            loginInformation: {
                googleToken: userLoginDto.loginInformation.googleToken,
            },
        };
        const normalLogin = {
            password: {
                googleToken: userLoginDto.loginInformation.password,
            },
            $or: [
                {
                    phoneNumber: {
                        phoneNumber: userLoginDto.loginString,
                    },
                    email: userLoginDto.loginString,
                },
            ],
        };

        return {
            $or: [normalLogin, facebookTokenLogin, googleTokenLogin],
        };
    }
}
