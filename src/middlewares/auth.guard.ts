import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log("The request inside guard is " , request.headers.authtoken);
    //check if this user is of a certain type

    return this.validateRequest(request);
  }


  validateRequest(request) {
    return true;
  }
}
