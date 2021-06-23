import { LoginDto } from "dto/auth/login.dto";
import { Injectable } from "@nestjs/common";
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

    findByLogin({
        loginString,
        password,
    }: LoginDto): Promise<User | undefined> {
        return this.findOne(loginString, password);
    }

    async findOne(
        loginString: string,
        password: string
    ): Promise<User | undefined> {
        return this.users.find((user) => user.loginString === loginString);
    }
}
