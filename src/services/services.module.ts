import { Module } from "@nestjs/common";
import { ErrorHandlerService } from "services/errorHandler.service";
import { JwtHandlerService } from "services/jwtHandler.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "auth/auth.constants";
@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.access_token,
        }),
    ],
    providers: [ErrorHandlerService, JwtHandlerService],
    exports: [ErrorHandlerService, JwtHandlerService],
})
export class ServicesModule {}
