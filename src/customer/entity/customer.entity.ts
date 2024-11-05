import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Customer } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CustomerEntity implements Customer {
  constructor(partial: Partial<CustomerEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cellphone: string | null;

  @ApiProperty()
  tellphone: string | null;

  @ApiProperty()
  document: string;

  @ApiProperty()
  type: $Enums.CustomerType;

  addressId: number;

  @Exclude()
  password: string;
}
