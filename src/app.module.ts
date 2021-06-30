import { UsersModule } from "users/users.module";
import { AuthModule } from "auth/auth.module";
import { Module } from "@nestjs/common";
import { CaslModule } from "./casl/casl.module";

@Module({
    imports: [AuthModule, UsersModule, CaslModule],
})
export class AppModule {}
