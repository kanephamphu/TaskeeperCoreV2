import { Tag } from "schemas/tag/tag.schema";
import { SearchTagsDto } from "dtos/tags/searchTag.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TagsService {
    constructor() {}

    searchTags(searchTagDto: SearchTagsDto): Promise<Tag[]> {
        return;
    }
}
