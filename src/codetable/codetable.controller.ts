import { EncodingType } from "enums/codetable/codetableDirectories.enum";
import {
    CACHE_MANAGER,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Query,
    Res,
} from "@nestjs/common";
import { LanguageCode } from "enums/codetable/language.enum";
import { CodeTableDir } from "enums/codetable/codetableDirectories.enum";
import * as fs from "fs";
import * as xml from "xml-js";
import { CACHE } from "enums/codetable/cache.enum";

@Controller("codetables")
export default class CodeTablesController {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    rootCodeTableDir = "src/codetable/root";

    @Get("isdcode")
    async getISDCode(@Res() res, @Query() req) {
        const languageCode: LanguageCode = LanguageCode.VI;
        const cacheCode = `${CACHE}${languageCode}`;
        let isdCodeData = await this.cacheManager.get(cacheCode);
        if (!isdCodeData) {
            const codeTableXml = `${this.rootCodeTableDir}/${languageCode}/${CodeTableDir.ISD_CODE}`;

            const xmlISDData = await fs.readFileSync(
                codeTableXml,
                EncodingType.UTF8
            );
            isdCodeData = JSON.parse(
                xml.xml2json(isdCodeData, {
                    compact: true,
                    spaces: 4,
                })
            );
            await this.cacheManager.set(cacheCode, isdCodeData);
        }

        return res.status(HttpStatus.OK).json({
            message: "success",
            data: isdCodeData,
        });
    }
}
