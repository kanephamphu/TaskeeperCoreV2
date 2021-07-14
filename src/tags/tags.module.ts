import { Tag, TagSchema } from "schemas/tag/tag.schema";
import { Module } from "@nestjs/common";
import { TagsController } from "tags/tags.controller";
import { TagsService } from "tags/tags.service";
import { NestjsQueryMongooseModule } from "@nestjs-query/query-mongoose";

@Module({
    imports: [
        NestjsQueryMongooseModule.forFeature([
            { document: Tag, name: Tag.name, schema: TagSchema },
        ]),
    ],
    controllers: [TagsController],
    providers: [TagsService],
})
export class TagsModule {}
