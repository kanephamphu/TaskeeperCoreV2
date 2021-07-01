// import { usersProviders } from "users/users.providers";
import { Module } from "@nestjs/common";
import CodeTablesController from "codetables/codetables.controller";
@Module({
    controllers: [CodeTablesController],
})
export class CodeTablesModule {}
