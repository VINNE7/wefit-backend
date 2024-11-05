import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ConfigModule.forRoot(), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
