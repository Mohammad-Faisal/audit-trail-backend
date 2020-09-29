import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { UserService } from '../domains/user-management/user/user.service';


@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {


  constructor(private userService: UserService ) {}

  async use(req: Request, res: Response, next: Function) {

    const token: any = req.headers.authtoken;

    let firebaseUid = null

    if(token) {
      await admin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
          console.log('Logged In User Id is ', decodedToken.uid);
          req.body.requesterFirebaseId = decodedToken.uid;
          firebaseUid = decodedToken.uid;
        })
        .catch(err => {
          console.log('authentication error occurred ', err.message);
          //throw new CommonException(ErrorCodes.NOT_AUTHORIZED)
        });

      if(firebaseUid) {
        const userProfile  = await this.userService.getUserDetails(req)
        //console.log("User profile is found  ",userProfile.getValue());
        if(userProfile) req.body.requesterProfileId = userProfile.getValue().id;
      }

    }else{
      console.log("token not found  " , token)
      //throw new CommonException(ErrorCodes.NOT_AUTHORIZED)
    }


    next();
  }
}
