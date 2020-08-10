import { HttpException, HttpStatus } from '@nestjs/common';

export default class CommonException extends HttpException{
  errorCode :number = 10000;
  constructor(message :string , errorCode ? : number) {
    super(message, 460);
    this.errorCode = errorCode;
  }
}