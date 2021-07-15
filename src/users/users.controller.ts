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
} from "@nestjs/common";
import { SEARCH_TAGS, COMMON_MESSAGE } from "enums/message/message.enum";
import * as _ from "lodash";
import { MailService } from "mail/mail.service";

@Controller("users")
export default class UserController {
    constructor(
        private usersService: UsersService,
        private mailService: MailService
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
}
