import { EntityRepository, Repository } from 'typeorm';
import { AuditItem } from '../entities/AuditItem';

@EntityRepository(AuditItem)
export class AuditItemRepository extends Repository<AuditItem> {}