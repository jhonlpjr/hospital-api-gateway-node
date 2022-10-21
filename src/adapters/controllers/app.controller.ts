import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'src/shared/classes/response.class';
import { AppService } from 'src/application/app.service';
import { CreatePatientReqDto } from 'src/adapters/dto/request/create-patient-req.dto';

@ApiTags('Hospital')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): Response {
  //   return this.appService.getHello();
  // }

  @ApiResponse({ status: 200, description: 'Patient registered.', type: Response })
  @ApiResponse({ status: 500, description: 'Problems to register patient.', type: Response })
  @Post('patient')
  async createPatient(@Body() dto: CreatePatientReqDto) {
    return await this.appService.createPatient(dto);
  }

  @ApiResponse({ status: 200, description: 'Patient List', type: Response })
  @ApiResponse({ status: 500, description: 'Problems with Patient List.', type: Response })
  @Get('patient')
  async getAllPatients() {
    return await this.appService.getAllPatients();
  }
}
