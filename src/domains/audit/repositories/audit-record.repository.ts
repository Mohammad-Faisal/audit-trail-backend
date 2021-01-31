import { EntityRepository, Repository } from 'typeorm';
import { AuditRecord } from '../entities/AuditRecord';

@EntityRepository(AuditRecord)
export class AuditRecordRepository extends Repository<AuditRecord> {}