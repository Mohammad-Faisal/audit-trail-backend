import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm/index';
import { ErrorResponse } from '../models/ErrorResponse';

@Catch()

export class ExceptionsFilter implements ExceptionFilter {


    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let errorMessage: any = exception instanceof HttpException
          ? exception.getResponse()
          : exception.message;

        if (exception instanceof QueryFailedError) {
            console.log('this is a database level error', exception);
        }

        if (exception instanceof BadRequestException) {
            const errors: any = exception.getResponse();
            if (errors.message.length > 0) errorMessage = errors.message[0];
            else errorMessage = 'Bad Request';
        }


        const status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json(new ErrorResponse(status , exception.errorCode , errorMessage ,request.url , new Date().toISOString()  ) );
    }

}