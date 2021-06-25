import { UsersService } from "users/users.service";
import { Controller, Get, UseGuards, Query, Param } from "@nestjs/common";
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard";

@Controller("users")
export default class UserController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Query() query) {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return id;
    }
}
