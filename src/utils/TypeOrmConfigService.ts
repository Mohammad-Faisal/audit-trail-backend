import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserService } from '../domains/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {}


    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'rokkhihome',
            password: 'rokkhihome',
            database: 'rokkhihome',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }
}