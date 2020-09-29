import { Module } from '@nestjs/common';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeService } from './privilege.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserFunctionRepository} from "./repositories/UserFunctionRepository";
import {UserRoleRepository} from "./repositories/UserRoleRepository";
import { UserRepository } from '../user/repositories/UserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserRoleRepository ,
    UserFunctionRepository ,
    UserRepository ,
  ])],
  controllers: [PrivilegeController],
  providers: [PrivilegeService]
})
export class PrivilegeModule {}
