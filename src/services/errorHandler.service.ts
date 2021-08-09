import { COMMON_MESSAGE } from "enums/message/message.enum";
import { HttpException, HttpStatus, Res } from "@nestjs/common";
export class ErrorHandlerService {
    constructor() {}

    handleError(error: Error): HttpException {
        if (error instanceof HttpException) {
            return error;
        }

        return new HttpException(
            {
                message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR,
                error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
