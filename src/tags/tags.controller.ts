import { TagsService } from "tags/tags.service";
import { SearchTagsDto } from "dtos/tags/searchTag.dto";
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";

@Controller("tags")
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @Post("searchTags")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async searchTagsLight(
        @Res() res,
        @Body() searchTagsDto: SearchTagsDto
    ) {
        try {
            const tags = await this.tagsService.searchTags(searchTagsDto);

            if (tags) {
                return res.status(HttpStatus.CREATED).json({ data: tags });
            }
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error,
            });
        } finally {
            return res.status(HttpStatus.CREATED).json({});
        }
    }
}
