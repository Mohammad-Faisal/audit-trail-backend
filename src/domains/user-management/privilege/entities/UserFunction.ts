import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../../models/BaseEntity';
import {ManyToMany} from 'typeorm/index';
import { UserRole} from "./UserRole";


@Entity({ name : "USER_FUNCTION"})
export class UserFunction extends BaseEntity{


    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    description: string;

    @ManyToMany(type => UserRole,  userGroup => userGroup.userFunctions ,
      {eager : false , onUpdate: 'CASCADE' } )
    userRoles: any;


}