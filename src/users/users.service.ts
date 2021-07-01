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

    // async findByPayload({ loginString }: JwtPayload): Promise<UserDto> {
    //     return await this.findOne(loginString);
    // }
}
