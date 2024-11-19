import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiCustomResponse } from 'global/api.custom.response';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EmailSendDTO } from './dto/emailSend.dto';
import { EmailResponseDTO } from './dto/emailResponse.dto';

@Controller('email')
@ApiBearerAuth('access-token')
export class EmailController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy) { }

    @ApiCustomResponse({ model: EmailResponseDTO })
    @UseGuards(JwtAuthGuard)
    @Post()
    sendEmail(@Body() EmailSendDTO: EmailSendDTO) {
        return this.assetsClient.send({ cmd: 'assets_email_send' }, EmailSendDTO);
    }
}
