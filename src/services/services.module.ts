import { Module } from "@nestjs/common";
import { ErrorHandlerService } from "services/errorHandler.service";
import { JwtHandlerService } from "services/jwtHandler.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
@Module({
    imports: [
        JwtModule.register({
            secret: `${process.env.JWT_KEY}`,
        }),
    ],
    providers: [ErrorHandlerService, JwtHandlerService],
    exports: [ErrorHandlerService, JwtHandlerService],
})
export class ServicesModule {}
