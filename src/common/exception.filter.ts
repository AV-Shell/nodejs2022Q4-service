import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { MyLogger } from '../logger/logger.service';

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
  constructor(private logger: MyLogger) {}

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status;
    let message;
    let reason;
    try {
      status = exception.getStatus();
      message = exception?.message?.error || exception?.message || ' :(';
      reason = exception?.messages || 'may be I ... may be You ...';
    } catch {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'something went wrong';
      reason = 'shit happens';
    }
    const { method, body, query, protocol, hostname, originalUrl } = request;
    this.logger.error(
      JSON.stringify(
        {
          ['Error Message']:
            exception?.message?.error || exception?.message || '',

          ['Error Stack']: exception,
          ['Request method']: method,
          ['Response status']: status,
          ['Request url']: `${protocol}://${hostname}${originalUrl}`,
          ['Request body']: body,
          ['Query params']: query,
        },
        null,
        4,
      ),
    );

    const errorToSend = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      reason,
      method: request.method,
    };
    response.status(status).json(errorToSend);
  }
}
