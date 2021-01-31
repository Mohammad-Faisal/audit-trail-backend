import { Entity, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";
import { User } from '../../user/entities/User';
import { Site } from '../../site/entities/Site';
import { AuditItem } from './AuditItem';


@Entity({ name : "AUDIT_RECORD"})
export class AuditRecord extends BaseEntity{

  @Column({name:"DESCRIPTION", nullable : false})
  description: string = "";

  @ManyToOne(type => Site, site => site.changes,{ eager: false , onDelete:"CASCADE" })
  site: any;

  @ManyToOne(type => User, { eager: false })
  user: any;

  @OneToMany(
    type => AuditItem,
    auditItem => auditItem.auditRecord,
    {
      eager: true
    }
  )
  items: AuditItem[];


  constructor(description , userId , siteId) {
    super();
    this.user = userId;
    this.site = siteId;
    this.description = description;
  }

}