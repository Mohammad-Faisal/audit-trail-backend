import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserModule } from './domains/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule ,
  ],
  controllers: [],
  providers: [],
})
export class AppModule  implements NestModule{

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }

}
