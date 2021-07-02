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

@Controller("users")
export default class UserController {
    constructor(private usersService: UsersService) {}

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
            const {
                verifyInformation,
                loginInformation,
                ...data
            } = user.toObject();

            return res
                .status(HttpStatus.CREATED)
                .json({ message: CREATE_USER_MESSAGE.SUCCESS, data });
        } catch (error) {
            console.error(error);
            //Todo: Error Handler
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: CREATE_USER_MESSAGE.FAILED,
                error,
            });
        }
    }

    @Post("login")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async login(@Res() res, @Body() userLoginDto: UserLoginDto) {
        try {
            const user = await this.usersService.login(userLoginDto);

            if (user) {
                return res
                    .status(HttpStatus.ACCEPTED)
                    .json({ message: USER_LOGIN_MESSAGE.SUCCESS, user });
            }
        } catch (error) {
            //Todo: Error Handler
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: USER_LOGIN_MESSAGE.FAILED,
                error,
            });
        } finally {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: USER_LOGIN_MESSAGE.FAILED });
        }
    }
}
