import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePatientDto } from './domain/dto/create-patient.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('patient')
  async createPatient(@Body() dto: CreatePatientDto) {
    return await this.appService.createPatient(dto);
  }

  @Get('patient')
  async getAllPatients() {
    return await this.appService.getAllPatients();
  }
}
