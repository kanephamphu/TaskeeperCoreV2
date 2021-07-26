import {
    searchTagsByString,
    searchTagsQueryBuilder,
} from "shared/querybuilder/tagQuery.builder";
import { Tag } from "schemas/tag/tag.schema";
import { SearchTagsDto } from "dtos/tags/searchTag.dto";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectQueryService, QueryService } from "@nestjs-query/core";
import SearchTagByStringDto from "dtos/tags/searchTagByString.dto";

@Injectable()
export class TagsService {
    constructor(
        @InjectQueryService(Tag) readonly tagsQueryService: QueryService<Tag>
    ) {}

    searchTags(searchTagDto: SearchTagsDto): Promise<Tag[]> {
        const query = searchTagsQueryBuilder(searchTagDto);

        return this.tagsQueryService.query(query);
    }

    searchTagsByString(
        searchTagByStringDto: SearchTagByStringDto
    ): Promise<Tag[]> {
        const query = searchTagsByString(searchTagByStringDto);

        return this.tagsQueryService.query(query);
    }
}
