import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";
import { User } from '../../user/entities/User';
import { AuditRecord } from './AuditRecord';


@Entity({ name : "AUDIT_ITEM"})
export class AuditItem extends BaseEntity{

  @Column({name:"CHANGED_FIELD", nullable : false})
  changedField: string = "";

  @Column({name:"CHANGE_DESCRIPTION", nullable : false})
  changeDescription: string = "";

  @ManyToOne(type => AuditRecord, { eager: false })
  auditRecord: any;

  constructor( changedField , oldValue , newValue , auditRecord) {
    super();
    this.auditRecord = auditRecord;
    this.changedField = changedField;
    this.changeDescription = `The value is changed from ${oldValue} to ${newValue}`
  }

}