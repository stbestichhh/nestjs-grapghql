import { Module } from '@nestjs/common';
import { getTypeORMConfig } from './orm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getTypeORMConfig],
    }),
  ],
})
export class AppConfigModule {}
