import {Entity, Column, ManyToMany, JoinTable} from 'typeorm';
import {BaseEntity} from "../../../../models/BaseEntity";
import {UserRole} from "../../privilege/entities/UserRole";


@Entity({ name : "USER"})
export class User extends BaseEntity{

  @Column({nullable:true})
  firebaseId: string = "";

  @Column({nullable : false})
  name: string = "";

  @Column({default:""})
  phone: string = "";

  @Column({default:""})
  email: string = "";

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(type => UserRole, userRole => userRole.users,{
    eager: false
  })
  @JoinTable()
  userRoles: UserRole[];
}