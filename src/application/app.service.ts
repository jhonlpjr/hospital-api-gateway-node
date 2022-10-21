import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  ClientProxy,
} from '@nestjs/microservices';
import { Response } from 'src/shared/classes/response.class';
import { CreatePatientReqDto } from '../adapters/dto/request/create-patient-req.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject('PATIENT_SERVICE') private readonly patientClient: ClientProxy,
  ) {}

  getHello(): Response {
    const res = new Response({statusCode: HttpStatus.OK, data: 'Hello World!', message: 'Hello World!'});
    return res;
  }

  async createPatient(dto: CreatePatientReqDto) {
    const microserviceRes = this.patientClient.send({ cmd: 'create_patient' }, dto);
    return microserviceRes;
  }

  async getAllPatients() {
    const microserviceRes = this.patientClient.send({ cmd: 'find_all_patients' }, {})
    return microserviceRes;
  }
}
