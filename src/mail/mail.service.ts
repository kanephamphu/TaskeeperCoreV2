import { getVerifyEmailSubject, getTeamName } from "shared/utils/emailHelper";
import { User } from "schemas/user/user.schema";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserVerification(user: User) {
        const url = `${process.env.DEV_WEB_URL}/auth/confirm?token=${user.verifyInformation.token}&id=${user._id}`;

        await this.mailerService.sendMail({
            to: `${user.email}`,
            from: `"${getTeamName(user.languageCode)}" <support@taskeeper.net>`,
            subject: `${getVerifyEmailSubject(user.languageCode)}`,
            template: `./${user.languageCode}_verification`,
            context: {
                name: `${user.firstName}`,
                url,
                verifyNumber: `${user.verifyInformation.verifyNumber}`,
            },
        });
    }
}
