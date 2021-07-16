import { ErrorHandlerService } from "services/errorHandler.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "dtos/user/createUser.dto";
import { UsersService } from "users/users.service";
import {
    Controller,
    Body,
    Res,
    Post,
    HttpStatus,
    UsePipes,
    ValidationPipe,
    UseGuards,
    HttpException,
} from "@nestjs/common";
import { SEARCH_TAGS, COMMON_MESSAGE } from "enums/message/message.enum";
import * as _ from "lodash";
import { MailService } from "mail/mail.service";
import FirstTimeTagsDto from "dtos/user/firstTimeTags.dto";

@Controller("users")
export default class UserController {
    constructor(
        private usersService: UsersService,
        private mailService: MailService,
        private errorHandlerService: ErrorHandlerService
    ) {}

    @Post("create")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async create(@Res() res, @Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.usersService.create(createUserDto);

            if (user) {
                const {
                    verifyInformation,
                    loginInformation,
                    ...data
                } = user.toObject();
                this.mailService.sendUserVerification(user);
                return res
                    .status(HttpStatus.CREATED)
                    .json({ message: SEARCH_TAGS.SUCCESS, data });
            }
        } catch (error) {
            console.error(error);
            //Todo: Error Handler
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR,
                error,
            });
        } finally {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: SEARCH_TAGS.NOT_FOUND });
        }
    }

    @Post("handleFirstTimeLogin")
    public async addTags(
        @Res() res,
        @Body() firstTimeTagsDto: FirstTimeTagsDto
    ) {
        try {
            const success = await this.usersService.handleFirstTimeTags(
                firstTimeTagsDto
            );

            if (success) {
                res.status(HttpStatus.CREATED).json({
                    success,
                });
            }
        } catch (error) {
            const errorHandled: HttpException = this.errorHandlerService.handleError(
                error
            );
            res.status(errorHandled.getStatus()).json(
                errorHandled.getResponse()
            );
        }
    }
}
