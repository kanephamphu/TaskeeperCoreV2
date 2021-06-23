import AuthController from "auth/auth.controller";
import { UsersService } from "users/users.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "auth/auth.service";
import { jwtConstants } from "auth/constants";
import { JwtStrategy } from "auth/strategies/jwt.strategy";
@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: "jwt",
            property: "user",
            session: false,
        }),
        ,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "60s" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UsersService],
    exports: [],
})
export class AuthModule {}
