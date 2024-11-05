import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaClientExceptionFilter } from 'src/common/prisma-client-exception-filter';
import { ApiOkResponse } from '@nestjs/swagger';
import { CustomerEntity } from './entity/customer.entity';
import { AuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { AuthType } from 'src/common/enums/auth-type.enum';

@Controller('customer')
@UseInterceptors(ClassSerializerInterceptor)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @AuthGuard(AuthType.None)
  @UseFilters(new PrismaClientExceptionFilter())
  @ApiOkResponse({ type: CustomerEntity })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create(createCustomerDto);

    return new CustomerEntity(customer);
  }
}
