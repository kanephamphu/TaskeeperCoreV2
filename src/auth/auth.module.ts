import { UsersModule } from "users/users.module";
import { AuthService } from "auth/services/auth.service";
import AuthController from "auth/controllers/auth.controller";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
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
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [],
})
export class AuthModule {}
