import { CacheModule, Module } from "@nestjs/common";
import CodeTablesController from "codetable/codetable.controller";

@Module({
    imports: [CacheModule.register()],
    controllers: [CodeTablesController],
})
export class CodetableModule {}
