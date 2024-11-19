import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailSendDTO } from "./dto/emailSend.dto";

@Injectable()
export class EmailService {
    constructor(private MailerService: MailerService) { };

    async sendEmail(EmailSendDTO: EmailSendDTO) {
        if (!EmailSendDTO.text && !EmailSendDTO.html)
            return new Error('Email content must have either text or html.');

        const result = await this.MailerService.sendMail(EmailSendDTO);

        return {
            envelope: result.envelope,
            accepted: result.accepted,
            rejected: result.rejected,
            messageId: result.messageId
        };
    }
}
