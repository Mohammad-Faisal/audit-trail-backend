import { IsNotEmpty } from 'class-validator';

export class BaseRequest {

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    userName: string;

    limit: string;

    pageId: string;

}