import { ForgotPasswordDto } from "dtos/auth/forgotPassword.dto";
import UserLoginDto from "dtos/user/login.dto";
import { SearchUsersDto } from "dtos/user/searchUser.dto";
import { AccountStatus } from "enums/user/user.enum";
import { User } from "schemas/user/user.schema";
import { Query } from "@nestjs-query/core";
import * as _ from "lodash";

export const buildLoginQuery = (userLoginDto: UserLoginDto): any => {
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
        $or: [
            {
                "phoneNumber.phoneNumber": userLoginDto.loginString,
            },
            {
                email: userLoginDto.loginString,
            },
        ],
    };

    return {
        $or: [normalLogin, facebookTokenLogin, googleTokenLogin],
    };
};

export const buildForgotPasswordQuery = (
    forgotPasswordDto: ForgotPasswordDto
): Object => {
    return {
        $or: [
            {
                phoneNumber: {
                    phoneNumber: forgotPasswordDto.forgotPasswordString,
                },
            },
            {
                email: forgotPasswordDto.forgotPasswordString,
            },
        ],
    };
};

export const firstTimeTagsQueryBuilder = (tagIds: string[]): Object => {
    return {
        accountStatus: AccountStatus.ACTIVE,
        $push: {
            tags: {
                $each: tagIds,
            },
        },
    };
};

export const searchUsersQueryBuilder = (
    searchUsersDto: SearchUsersDto
): Query<User> => {
    const searchUsersQuery: Query<User> = {};

    searchUsersDto.sorting &&
        _.set(searchUsersQuery, "sorting", searchUsersDto.sorting);
    searchUsersDto.filter &&
        _.set(searchUsersQuery, "filter", searchUsersDto.filter);
    searchUsersDto.paging &&
        _.set(searchUsersQuery, "paging", searchUsersDto.paging);

    return searchUsersQuery;
};
