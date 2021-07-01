import { CreateUserDto } from "dtos/user/createUser.dto";
import { UsersService } from "users/users.service";
import { Controller, Body, Res, Post, HttpStatus } from "@nestjs/common";
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard";
import { CREATE_USER_MESSAGE } from "enums/message/message.enum";

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
    public async create(@Res() res, @Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.usersService.create(createUserDto);

            return res
                .status(HttpStatus.CREATED)
                .json({ message: CREATE_USER_MESSAGE.SUCCESS, user });
        } catch (error) {
            console.error(error);
            //Todo: Error Handler
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: CREATE_USER_MESSAGE.FAILED,
                error,
                status: 400,
            });
        }
    }
}
