import { UserDto } from "users/dto/user.dto";
import _ from "lodash";

export const toUserDto = (data: any): UserDto => {
    const { userId, loginString } = data;
    const userDto: UserDto = {
        userId,
        loginString,
    };

    return userDto;
};
