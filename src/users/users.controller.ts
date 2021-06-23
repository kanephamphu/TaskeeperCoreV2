import { Controller, Get, UseGuards, Query, Param } from "@nestjs/common";
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard";

@Controller("users")
export default class UserController {
    constructor() {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Query() query) {
        return `${query}`;
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return id;
    }
}
