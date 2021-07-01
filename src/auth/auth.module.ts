import AuthController from "auth/auth.controller";
import { UsersService } from "users/users.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "auth/auth.service";
import { JwtStrategy } from "auth/strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: "jwt",
            property: "user",
            session: false,
        }),
        JwtModule.register({
            secret: `${process.env.JWT_KEY}`,
            // signOptions: {
            //     expiresIn: `${process.env.EXPIRESIN}`,
            // },
        }),
    ],
    controllers: [AuthController],
    providers: [],
    exports: [],
})
export class AuthModule {}
