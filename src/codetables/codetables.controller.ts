import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { LanguageCode } from "enums/codetables/language.enum";
import { CodeTableDir } from "enums/codetables/codetableDirectories.enum";
import fs from "fs";
import { parseString } from "xml2js";

@Controller("codeTables")
export default class CodeTablesController {
    rootCodeTableDir = "codetables/root";

    @Get("ISDCode")
    getISDCode(@Res() res, @Req() req) {
        const languageCode: LanguageCode = LanguageCode.VI;

        const xmlISDData = fs.createReadStream(
            `${this.rootCodeTableDir}/${languageCode}/${CodeTableDir.ISD_CODE}`
        );

        return res.status(HttpStatus.OK).json({
            message: "success",
            data: parseString(xmlISDData),
        });
    }
}
