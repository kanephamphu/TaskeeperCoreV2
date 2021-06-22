import { Module } from "@nestjs/common";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
