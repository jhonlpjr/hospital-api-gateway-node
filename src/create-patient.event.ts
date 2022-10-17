import { CreatePatientDto } from "./domain/dto/create-patient.dto";

export class CreatePatientEvent {
    constructor(public readonly dto: CreatePatientDto) {}
  }