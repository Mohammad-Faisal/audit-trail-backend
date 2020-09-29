import { BaseModel } from 'sjs-base-model';
import { User } from '../entities/User';

export class UsersDetailsResponse  extends BaseModel{



  userId = 0;
  firebaseId = "";
  name = "";
  phone ="";
  email="";
  address="";
  organization="";
  nid="";
  password="";
  gender= "";
  age= 0;
  image ="";
  thumbImage= "";
  primaryRoleCode = "";
  isActive = false;

  userFunctions  =[];
  userRoles  =[];
  userDevices =[];

  communityId =0 ;
  buildingId =0;
  flatId =0;

  communityName ="";
  buildingName="";
  flatName ="";


  constructor(data : User) {
    super();
    this.update(data);
    if(data){

      this.userId = data.id;
      this.firebaseId = data.firebaseId;
      this.name = data.name;
      this.phone=  data.phone;
      this.email  = data.email;
      this.address = data.address;
      this.organization = data.organization;
      this.nid = data.nid;
      this.password = data.password;
      this.age = data.age;
      this.image = data.image;
      this.thumbImage = data.thumbImage;
      this.primaryRoleCode = data.primaryRoleCode;
      this.isActive = data.isActive;

      if(data.community){
        this.communityId = data.community.id;
        this.communityName = data.community.name;
      }
      if(data.building){
        this.buildingId = data.building.id;
        this.buildingName = data.building.name;
      }
      if(data.flat){
        this.flatId = data.flat.id;
        this.flatName = data.flat.number;
      }
    }
  }

}