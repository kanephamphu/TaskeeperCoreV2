import { CodeTableDto } from "dtos/codetable/codetable.dto";
import * as _ from "lodash";

export const codeTablesMapper = (codeTablesData: any): CodeTableDto[] => {
    return _.map(codeTablesData, (codeTableData) => {
        const codeTable = new CodeTableDto();
        codeTable.codeId = codeTableData.CodeId._text;
        codeTable.codeValue = codeTableData.CodeValue._text;
        codeTable.codeDescription = codeTableData.CodeDescription._text;

        return codeTable;
    });
};
