import { ForgotPasswordDto } from "./../../dtos/auth/forgotPassword.dto";
import { AccountStatus } from "enums/user/user.enum";
import UserLoginDto from "dtos/user/login.dto";

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
                phoneNumber: {
                    phoneNumber: userLoginDto.loginString,
                },
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
