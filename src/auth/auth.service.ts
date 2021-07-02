import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginStatus } from "auth/interfaces/login-status.interface";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    verifyByToken(token: string, userId: string): Promise<boolean | Error> {
        return this.usersService.verifyAccountByToken(token, userId);
    }
    // async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    //     // find user in db
    //     const user = await this.usersService.findByLogin(loginUserDto);

    //     // generate and sign token
    //     const token = this._createToken(user);

    //     return {
    //         loginString: user.loginString,
    //         ...token,
    //     };
    // }

    // async validateUser(payload: JwtPayload): Promise<UserDto> {
    //     const user = await this.usersService.findByPayload(payload);
    //     if (!user) {
    //         throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    //     }

    //     return user;
    // }

    // private _createToken({ loginString }: UserDto): any {
    //     const expiresIn = process.env.EXPIRESIN;

    //     const user: JwtPayload = { loginString };
    //     const accessToken = this.jwtService.sign(user);

    //     return {
    //         expiresIn,
    //         accessToken,
    //     };
    // }
}
