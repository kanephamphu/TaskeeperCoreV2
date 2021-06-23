import { Module } from "@nestjs/common";
import { UsersService } from "users/users.service";
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard";
import UserController from "users/users.controller";
@Module({
    controllers: [UserController],
    providers: [UsersService, JwtAuthGuard],
})
export class UsersModule {}
