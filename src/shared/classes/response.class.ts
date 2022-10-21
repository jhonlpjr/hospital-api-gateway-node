import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import Verificate, {
  VerificateDefaultNumber,
  VerificateString,
} from 'src/shared/functions/validate';

export class Response {
  @ApiProperty({ default: 200 })
  statusCode?: HttpStatus;
  @ApiProperty({ default: 'OK' })
  message?: string;
  @ApiProperty({ default: { some: 'thing' } })
  data?: any;

  constructor(partial?: Response) {
    this.statusCode = VerificateDefaultNumber(
      partial.statusCode,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.message = VerificateString(partial.message);
    this.data = Verificate(partial.data);
  }
}
