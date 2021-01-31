import { Injectable } from '@nestjs/common';
import { SignUpRequest } from '../user/requests/SignUpRequest';
import { Result } from '../../models/Result';
import { UsersAuthenticationResponse } from '../user/responses/UsersAuthenticationResponse';
import { SiteRepository } from './repositories/site.repository';
import { CreateSiteRequest } from './requests/CreateSiteRequest';
import { Site } from './entities/Site';
import { GetSitesRequest } from './requests/GetSitesRequest';
import { UpdateSiteRequest } from './requests/UpdateSiteRequest';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { AuditItem } from '../audit/entities/AuditItem';
import { AuditRecord } from '../audit/entities/AuditRecord';
import { AuditRecordRepository } from '../audit/repositories/audit-record.repository';
import { AuditItemRepository } from '../audit/repositories/audit-item.repository';

@Injectable()
export class SiteService {


  constructor(
    private readonly siteRepository: SiteRepository,
    private readonly auditRecordRepository: AuditRecordRepository,
    private readonly auditItemRepository: AuditItemRepository
  ) {}


  async createSite(request: CreateSiteRequest):  Promise<Result> {

    const siteModel = new Site();

    siteModel.name = request.name;
    siteModel.description = request.description;
    siteModel.region = request.region;
    siteModel.lat = request.lat;
    siteModel.lng = request.lng;
    
    const site = await  this.siteRepository.save(siteModel);
    await this.saveCreateAuditLog(request, site);

    return Result.success(site)
  }

  private async saveCreateAuditLog(request: CreateSiteRequest, site: Site) {
    const auditDescription = `Created By by ${request.userName} on ${site.createdDate}`;
    const auditRecordModel = new AuditRecord(auditDescription, request.userId, site.id);
    await this.auditRecordRepository.save(auditRecordModel);
  }

  async getSites(request: GetSitesRequest):  Promise<Result> {
    const siteResponse = await  this.siteRepository.find();
    return Result.success(siteResponse)
  }


  async updateSite(request: UpdateSiteRequest):  Promise<Result> {

    const oldSite = await this.siteRepository.findOne(request.siteId);
    if(!oldSite) throw new CommonException(ErrorCodes.SITE_NOT_FOUND);

    const auditRecord = await this.saveUpdateAuditLog(request, oldSite);

    const keys =Object.keys(oldSite);
    const fieldChanges : AuditItem[]= [];

    for(const fieldName of keys){
      if(oldSite[`${fieldName}`] !== request[`${fieldName}`]){
        oldSite[`${fieldName}`] = request[`${fieldName}`]
        fieldChanges.push(this.createAuditItem(fieldName , oldSite , request , auditRecord));
      }
    }

    const site = await  this.siteRepository.save(oldSite);
    await this.auditItemRepository.save(fieldChanges);

    return Result.success(site)
  }

  private async saveUpdateAuditLog(request: UpdateSiteRequest, oldSite: Site) {
    const auditDescription = `Updated by ${request.userName} on `;
    const auditRecordModel = new AuditRecord(auditDescription, request.userId, oldSite.id);
    const auditRecord = await this.auditRecordRepository.save(auditRecordModel);
    return auditRecord;
  }

  createAuditItem = ( fieldName:string , oldSite: Site , newRequest: UpdateSiteRequest , auditRecord: AuditRecord ) => {
    return new AuditItem(fieldName , oldSite[`${fieldName}`] , newRequest[`${fieldName}`] , auditRecord.id);
  }





}
