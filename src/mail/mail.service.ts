import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserVerification(token: string) {
        const url = `example.com/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: "nowayit69@gmail.com",
            // from: '"Support Team" <support@example.com>', // override default from
            subject: "Welcome to Taskeeper App! Confirm your Email",
            template: "verification", // `.hbs` extension is appended automatically
            context: {
                name: "Tai",
                url,
            },
        });
    }
}
