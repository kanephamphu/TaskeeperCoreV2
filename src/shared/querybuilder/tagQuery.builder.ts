import { LanguageCode } from "enums/codetable/language.enum";
import { Query } from "@nestjs-query/core";
import { SearchTagsDto } from "dtos/tags/searchTag.dto";
import SearchTagByStringDto from "dtos/tags/searchTagByString.dto";
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

export const searchTagsByString = (
    searchTagsByStringDto: SearchTagByStringDto
): Query<Tag> => {
    const searchTagsByStringQuery: Query<Tag> = {};
    const searchTextLike = {
        iLike: searchTagsByStringDto.searchString,
    };

    switch (searchTagsByStringDto.languageCode) {
        case LanguageCode.VI:
            _.set(searchTagsByStringQuery, "filter", {
                "value.vi_VI": searchTextLike,
            });

            break;

        default:
            _.set(searchTagsByStringQuery, "filter", {
                "value.en_US": searchTextLike,
            });
            break;
    }

    searchTagsByStringQuery.paging = {
        limit: searchTagsByStringDto.limit,
        offset: searchTagsByStringDto.offset,
    };

    return searchTagsByStringQuery;
};
