import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';

import { UserModule } from './domains/user-management/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {AuthorizationMiddleware} from "./middlewares/authorization.middleware";
import {ImageModule} from "./domains/misc/image/image.module";
import {CommonModule} from "./domains/misc/common/common.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule] ,
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_URL'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER_NAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/entities/*{.ts,.js}'],
        synchronize: true,
        // autoLoadEntities:true
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV || 'development'}.env`
    }),
    UserModule ,
    CommonModule ,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule  implements NestModule{

  configure(consumer: MiddlewareConsumer) {

    consumer
        .apply(LoggerMiddleware , AuthorizationMiddleware)
        .exclude({ path: 'api/v1/common/getIdToken', method: RequestMethod.POST })
        .forRoutes('*');
  }

}
