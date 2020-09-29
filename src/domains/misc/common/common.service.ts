import { Injectable } from '@nestjs/common';
import { BuildingRepository } from '../../property-management/building/repositories/BuildingRepository';
import CommonException from '../../../models/CommonException';
import ErrorCodes from '../../../utils/ErrorCodes';
import { CommunityRepository } from '../../property-management/community/repositories/CommunityRepository';

@Injectable()
export class CommonService {

  constructor(
    private communityRepository: CommunityRepository,
    private buildingRepository: BuildingRepository,
  ) {
  }


  async getUserDetailsFromFirebaseId(buildingId: number): Promise<void> {
    if (buildingId) {
      const community = await this.buildingRepository.findOne({ where: { id: buildingId } });
      if (!community) throw new CommonException(ErrorCodes.BUILDING_NOT_FOUND);
    }
  }

  async checkIfBuildingIsValid(buildingId: number): Promise<void> {
    if (buildingId) {
      const community = await this.buildingRepository.findOne({ where: { id: buildingId } });
      if (!community) throw new CommonException(ErrorCodes.BUILDING_NOT_FOUND);
    }
  }

  async checkIfCommunityIsValid(communityId: number): Promise<void> {
    if (communityId) {
      const community = await this.communityRepository.findOne({ where: { id: communityId } });
      if (!community) throw new CommonException(ErrorCodes.BUILDING_NOT_FOUND);
    }
  }

  fillObjectWithDetails  (requestObject  : any , modelObject : any) {
    for (const [key, value] of Object.entries(requestObject)) {
      if(modelObject.hasOwnProperty(key)) modelObject[`${key}`] = value;
    }
    return modelObject;
  }


}
