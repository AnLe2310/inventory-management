import { HttpStatus, Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ExceptionInterceptor implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || exception.response.message || 'Internal Server Error';

    return response.status(status).json({
      statusCode: status,
      message: message,
      data: null,
    });
  }
}