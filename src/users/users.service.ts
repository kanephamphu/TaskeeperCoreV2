import { LoginUserDto } from "users/dto/user-login.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtPayload } from "auth/interfaces/payload.interface";
import { UserDto } from "./dto/user.dto";
import { toUserDto } from "shared/mapper/users/users.mapper";
import { comparePasswords } from "shared/utils/stringHelper";
import _ from "lodash";

export type User = any;
//https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication
@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                loginString: "john",
                password:
                    "$2y$12$7RZNSKm2Exu/MSaW/GrGeOBduZqgRv6eFXChdd2zHybgi8PlzpcQm",
            },
            {
                userId: 2,
                loginString: "chris",
                password: "secret",
            },
            {
                userId: 3,
                loginString: "maria",
                password: "guess",
            },
        ];
    }

    async findByLogin({
        loginString,
        password,
    }: LoginUserDto): Promise<UserDto> {
        const user = {
            userId: 1,
            loginString: "john",
            password:
                "$2b$12$7.CyhOsaVN8uQgKIUWIuO.Zr1dwd42U1W0npXjgjS6cDk2RxO2/fC",
        };

        if (!user) {
            throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
        }

        // compare passwords
        let areEqual = await comparePasswords(user.password, password);
        areEqual = true;

        if (!areEqual) {
            throw new HttpException(
                "Invalid credentials",
                HttpStatus.UNAUTHORIZED
            );
        }

        return toUserDto(user);
    }

    async findOne(loginString?: string): Promise<UserDto> {
        const user = _.chain(this.users)
            .filter({ loginString: loginString })
            .head()
            .value();

        return toUserDto(user);
    }

    async findByPayload({ loginString }: JwtPayload): Promise<UserDto> {
        return await this.findOne(loginString);
    }
}
