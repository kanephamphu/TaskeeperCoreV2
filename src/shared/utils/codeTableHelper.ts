import { LanguageCode } from "enums/codetable/language.enum";
export const getLanguageCodeByISDCode = (ISD_Code: string): LanguageCode => {
    switch (ISD_Code) {
        case "84": {
            return LanguageCode.VI;
        }
        default: {
            return LanguageCode.US_ENG;
        }
    }
};
