import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CustomerType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

const addressExample = {
  zipcode: '11111111',
  street: '1st street',
  number: '100',
  complement: 'Ap. 304',
  city: 'Sao Paulo',
  neighbourhood: 'Liberdade',
  state: 'SP',
};

function cleanInput(value: string): string {
  if (!value) return value;

  return value
    .normalize('NFD') // normalize the string to unicode, separating accent characters from the letters
    .replace(/[\u0300-\u036f]/g, '') // remove the accents
    .replace(/-/g, ' ') // replace hyphens for space characters
    .replace(/[^\w\s]/g, '');
}

class AddressObject {
  @IsNumberString()
  @Length(8, 8)
  @ApiProperty({
    description: 'Zip code of the address',
    minLength: 8,
    maxLength: 8,
    example: '11111111',
  })
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Street name of the address',
    example: '1st Street',
  })
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'House or building number', example: '100' })
  number: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Additional address information',
    required: false,
    example: 'Ap. 304',
  })
  complement: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => cleanInput(value))
  @ApiProperty({ description: 'City name', example: 'Sao Paulo' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Neighborhood name', example: 'Liberdade' })
  neighbourhood: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @ApiProperty({
    description: 'State abbreviation',
    minLength: 2,
    maxLength: 2,
    example: 'SP',
  })
  state: string;
}

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Document number of the customer',
    minLength: 11,
    maxLength: 14,
    required: true,
    example: '69414578056',
    examples: ['21236262000120', '69414578056'],
  })
  @IsNumberString()
  @Length(11, 14)
  @IsNotEmpty()
  document: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Full name of the customer',
    maxLength: 255,
    example: 'John Doe',
  })
  name: string;

  @ValidateIf((o) => o.type === CustomerType.PF)
  @IsNumberString()
  @Length(11, 11)
  @ApiProperty({ required: false })
  @ApiPropertyOptional({
    description: 'Customer cellphone number, required if type is PF',
    maxLength: 11,
    minLength: 11,
    example: '11999999999',
  })
  cellphone: string;

  @ValidateIf((o) => o.type === CustomerType.PJ)
  @IsNumberString()
  @Length(10, 10)
  @ApiPropertyOptional({
    description: 'Customer telephone number, required if type is PJ',
    maxLength: 10,
    minLength: 10,
    example: '1133333333',
  })
  tellphone: string;

  @ApiProperty({
    description: 'Email address of the customer',
    example: 'test@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Customer type, either PF (individual) or PJ (business)',
    enum: CustomerType,
    enumName: 'CustomerType',
    example: 'PF',
  })
  @IsEnum(CustomerType)
  @IsNotEmpty()
  type: CustomerType;

  @ValidateNested()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Address of the customer',
    example: addressExample,
  })
  @Type(() => AddressObject)
  address: AddressObject;
}
