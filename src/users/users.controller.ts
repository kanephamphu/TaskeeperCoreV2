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
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard";
import {
    CREATE_USER_MESSAGE,
    USER_LOGIN_MESSAGE,
} from "enums/message/message.enum";
import UserLoginDto from "dtos/user/login.dto";
import * as _ from "lodash";
import { MailService } from "mail/mail.service";

@Controller("users")
export default class UserController {
    constructor(
        private usersService: UsersService,
        private mailService: MailService
    ) {}

    // @UseGuards(JwtAuthGuard)
    // @Get()
    // findAll(@Query() query) {
    //     //return this.usersService.findAll();
    // }

    // @UseGuards(JwtAuthGuard)
    // @Get(":id")
    // findOne(@Param("id") id: string) {
    //     return id;
    // }

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
                    .json({ message: CREATE_USER_MESSAGE.SUCCESS, data });
            }
        } catch (error) {
            console.error(error);
            //Todo: Error Handler
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: CREATE_USER_MESSAGE.FAILED,
                error,
            });
        } finally {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: CREATE_USER_MESSAGE.FAILED });
        }
    }
}
