import { User } from '../entities/User';

export class UsersDetailsResponse {



  userId = 0;
  firebaseId = "";
  name = "";
  phone ="";
  email="";


  constructor(data : User) {
    if(data){

      this.userId = data.id;
      this.firebaseId = data.firebaseId;
      this.name = data.name;
      this.phone=  data.phone;
    }
  }

}