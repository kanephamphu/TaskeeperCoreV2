import { searchTagsQueryBuilder } from "shared/querybuilder/tagQuery.builder";
import { Tag } from "schemas/tag/tag.schema";
import { SearchTagsDto } from "dtos/tags/searchTag.dto";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectQueryService, QueryService } from "@nestjs-query/core";

@Injectable()
export class TagsService {
    constructor(
        @InjectQueryService(Tag) readonly tagsQueryService: QueryService<Tag>
    ) {}

    async searchTags(searchTagDto: SearchTagsDto): Promise<Tag[]> {
        const query = searchTagsQueryBuilder(searchTagDto);
        const tags: Tag[] = await this.tagsQueryService.query(query);

        return tags;
    }
}
