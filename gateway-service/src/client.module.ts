import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ASSETS_SERVICE',
                transport: Transport[process.env.ASSETS_TRANSPORT_TYPE],
                options: { host: process.env.ASSETS_SERVICE_HOST, port: parseInt(process.env.ASSETS_SERVICE_PORT) },
            },
            {
                name: 'AUTH_SERVICE',
                transport: Transport[process.env.AUTH_TRANSPORT_TYPE],
                options: { host: process.env.AUTH_SERVICE_HOST, port: parseInt(process.env.AUTH_SERVICE_PORT) },
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class ClientModule { }
