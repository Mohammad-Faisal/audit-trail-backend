import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
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