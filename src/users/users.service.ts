import { LoginUserDto } from "users/dto/user-login.dto";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "auth/interfaces/payload.interface";
import { UserDto } from "./dto/user.dto";
import { toUserDto } from "shared/mapper/users/users.mapper";

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
                password: "changeme",
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

    findByLogin({ loginString }: LoginUserDto): Promise<User | undefined> {
        return this.findOne(loginString);
    }

    async findOne(loginString?: string): Promise<UserDto> {
        const user = await this.users.findOne({ loginString: loginString });

        return toUserDto(user);
    }

    async findByPayload({ loginString }: JwtPayload): Promise<UserDto> {
        return await this.findOne(loginString);
    }
}
