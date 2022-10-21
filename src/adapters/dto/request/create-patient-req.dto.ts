import {
    IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientReqDto {

  @ApiProperty({ default: '00000010' })
  @IsNotEmpty()
  @IsNumberString()
  ID: string;

  @ApiProperty({ default: 'George' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  First_name: string;

  @ApiProperty({ default: 'Von' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  Last_name: string;

  @ApiProperty({ default: 'email@email.com' })
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 255)
  Email: string;

  @ApiProperty({ default: '999999999' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 20)
  Phone: string;
}
