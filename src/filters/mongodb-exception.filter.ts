// mongodb-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage = 'An unexpected error occurred';
    if (exception.code === 11000) {
      errorMessage = 'Duplicate entry';
    }

    response.status(status).json({
      statusCode: status,
      message: errorMessage,
    });
  }
}
