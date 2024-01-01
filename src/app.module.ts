import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/Database.module';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
