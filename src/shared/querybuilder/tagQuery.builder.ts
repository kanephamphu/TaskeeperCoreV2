import { Query, SortDirection } from "@nestjs-query/core";
import { SearchTagsDto } from "dtos/tags/searchTag.dto";
import * as _ from "lodash";
import { Tag } from "schemas/tag/tag.schema";

export const searchTagsQueryBuilder = (
    searchTagsDto: SearchTagsDto
): Query<Tag> => {
    const searchTagsQuery: Query<Tag> = {};
    searchTagsDto.sorting &&
        _.set(searchTagsQuery, "sorting", searchTagsDto.sorting);
    searchTagsDto.filter &&
        _.set(searchTagsQuery, "filter", searchTagsDto.filter);
    searchTagsDto.paging &&
        _.set(searchTagsQuery, "paging", searchTagsDto.paging);

    return searchTagsQuery;
};
