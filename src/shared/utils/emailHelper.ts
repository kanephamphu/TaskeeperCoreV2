import { Team_Name } from "enums/email/email.enum";
import { Verify_Subject } from "enums/email/email.enum";
import { LanguageCode } from "enums/codetable/language.enum";

export const getVerifyEmailSubject = (languageCode: string) => {
    switch (languageCode) {
        case LanguageCode.VI: {
            return Verify_Subject.vi_VI;
        }
        default: {
            return Verify_Subject.en_US;
        }
    }
};

export const getTeamName = (languageCode: string) => {
    switch (languageCode) {
        case LanguageCode.VI: {
            return Team_Name.vi_VI;
        }
        default: {
            return Team_Name.en_US;
        }
    }
};
