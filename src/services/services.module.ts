import { Module } from "@nestjs/common";
import { ErrorHandlerService } from "services/errorHandler.service";

@Module({
    providers: [ErrorHandlerService],
    exports: [ErrorHandlerService],
})
export class ServicesModule {}
