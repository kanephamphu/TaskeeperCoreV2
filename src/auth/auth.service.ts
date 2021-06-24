import { UserDto } from "users/dto/user.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "dto/auth/login.dto";
import { JwtPayload } from "./interfaces/payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async getValidateUser(loginDto: LoginDto): Promise<any> {
        const user = await this.usersService.findByLogin(loginDto);

        if (user && user.password === loginDto.password) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.getValidateUser(loginDto);

        if (!user) {
            return null;
        }

        const payload = { username: user.loginString, sub: user.userId };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);

        if (!user) {
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}
