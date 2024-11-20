import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailSendDTO } from "./dto/emailSend.dto";
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EmailService {
    constructor(private MailerService: MailerService) { };

    async sendEmail(EmailSendDTO: EmailSendDTO) {
        if (!EmailSendDTO.text && !EmailSendDTO.html)
            throw new RpcException('Email content must have either text or html.');

        const result = await this.MailerService.sendMail(EmailSendDTO);

        return {
            envelope: result.envelope,
            accepted: result.accepted,
            rejected: result.rejected,
            messageId: result.messageId
        };
    }
}
