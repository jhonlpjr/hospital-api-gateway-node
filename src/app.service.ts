import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientEvent } from './create-patient.event';
import { CreatePatientDto } from './domain/dto/create-patient.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject('PATIENT_SERVICE') private readonly patientClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createPatient(dto: CreatePatientDto) {
   return this.patientClient.send(
      {cmd: 'create_patient'},
      dto,
    );
  }

  async getAllPatients() {
    return this.patientClient.send({cmd: 'find_all_patients'}, {});
  }

}
