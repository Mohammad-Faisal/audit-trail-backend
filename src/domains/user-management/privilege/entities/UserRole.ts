import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../../models/BaseEntity';
import {JoinTable, ManyToMany} from 'typeorm/index';
import {UserFunction} from "./UserFunction";
import { User } from '../../user/entities/User';


@Entity({ name : "USER_ROLE"})
export class UserRole extends BaseEntity{


    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    description: string;

    @ManyToMany(type => UserFunction, userFunction => userFunction.userRoles,{
        eager: false
    })
    @JoinTable()
    userFunctions: UserFunction[];


    @ManyToMany(type => User,  user => user.userRoles ,
      {eager : false , onUpdate: 'CASCADE' } )
    users: any;


}