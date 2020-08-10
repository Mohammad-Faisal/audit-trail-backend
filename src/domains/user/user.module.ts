import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/User';
import { UserRepository } from './user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService ],
})

export class UserModule {

}
