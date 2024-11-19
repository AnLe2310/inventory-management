import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern } from '@nestjs/microservices';
import { EmailSendDTO } from "./dto/emailSend.dto";

@Controller('email')
export class EmailController {
    constructor(private readonly EmailService: EmailService) { }

    @MessagePattern({ cmd: "assets_email_send" })
    @Get()
    async sendEmail(payload: EmailSendDTO) {
        return await this.EmailService.sendEmail(payload);
    }
}
