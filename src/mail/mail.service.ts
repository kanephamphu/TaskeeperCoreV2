import { User } from "schemas/user/user.schema";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserVerification(user: User) {
        const url = `https://taskeeperv2.herokuapp.com/auth/confirm?token=${user.verifyInformation.token}`;

        await this.mailerService.sendMail({
            to: `${user.email}`,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: "Welcome to Taskeeper App! Confirm your Email",
            template: "./verification", // `.hbs` extension is appended automatically
            context: {
                name: `${user.firstName}`,
                url,
                verifyNumber: `${user.verifyInformation.verifyNumber}`,
            },
        });
    }
}
