import { UsersModule } from "users/users.module";
import { AuthModule } from "auth/auth.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [AuthModule, UsersModule],
})
export class AppModule {}
