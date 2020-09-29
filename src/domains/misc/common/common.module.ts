import { HttpModule, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityRepository } from '../../property-management/community/repositories/CommunityRepository';
import { BuildingRepository } from '../../property-management/building/repositories/BuildingRepository';
import { CommonController } from './common.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([  CommunityRepository ,  BuildingRepository ]) ,
    HttpModule ,
    ConfigService
  ] ,
  controllers : [CommonController] ,
  providers: [CommonService] ,
  exports : [CommonService]
})
export class CommonModule {}
