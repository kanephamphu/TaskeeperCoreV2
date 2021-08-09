import { CodeTablesService } from "codetable/codetable.service";
import { CacheModule, Module } from "@nestjs/common";
import CodeTablesController from "codetable/codetable.controller";

@Module({
    imports: [CacheModule.register({ ttl: 300 })],
    controllers: [CodeTablesController],
    providers: [CodeTablesService],
})
export class CodetableModule {}
