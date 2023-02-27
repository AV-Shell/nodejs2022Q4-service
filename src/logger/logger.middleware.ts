import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger.service';
import { finished } from 'stream';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private myLogger: MyLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, body, query, protocol, hostname, originalUrl } = req;

    const oldWrite = res.write,
      oldEnd = res.end;

    const chunks = [];
    let respBody;

    res.write = function (chunk, ...rest) {
      chunks.push(chunk);

      return oldWrite.call(res, chunk, ...rest);
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.end = function (chunk, ...rest) {
      if (chunk && typeof chunk !== 'function') chunks.push(chunk);

      respBody = Buffer.concat(chunks).toString('utf8');

      oldEnd.call(res, chunk, ...rest);
    };

    finished(res, () => {
      const { statusCode } = res;
      this.myLogger.log(
        `
          Request method: ${method}, Response status: ${statusCode};
          Request url:  ${protocol}://${hostname}${originalUrl};
          Request body: ${JSON.stringify(body)};
          Responce body: ${respBody};
          Query params: ${JSON.stringify(query)};`,
      );
    });

    next();
  }
}
