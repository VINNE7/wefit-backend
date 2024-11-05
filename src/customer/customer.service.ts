import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingService } from 'src/common/hashing.service';
import { UtilsService } from 'src/common/utils.service';
import { MailerService } from 'src/common/mailer/mailer.service';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingService,
    private utilService: UtilsService,
    private mailerService: MailerService,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const randomPassword = this.utilService.generatePassword();
    const customer = await this.prisma.$transaction(async (tx) => {
      const address = await tx.address.create({
        data: createCustomerDto.address,
      });

      const hashedRandomPassword =
        await this.hashingService.hash(randomPassword);
      const customer = await tx.customer.create({
        data: {
          ...createCustomerDto,
          password: hashedRandomPassword,
          address: { connect: { id: address.id } },
        },
      });

      return customer;
    });
    await this.mailerService.sendRandomPasswordEmail(
      customer.email,
      randomPassword,
    );
    return customer;
  }
}
