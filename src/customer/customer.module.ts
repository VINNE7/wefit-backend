import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from 'src/prisma/prisma.module';
import jwtConfig from 'src/common/config/jwt.config';
import { MailerModule } from 'src/common/mailer/mailer.module';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { HashingService } from 'src/common/hashing.service';
import { UtilsService } from 'src/common/utils.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MailerModule,
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    HashingService,
    UtilsService,
  ],
})
export class CustomerModule {}
