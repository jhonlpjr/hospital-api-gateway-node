import { HttpStatus } from '@nestjs/common';
import {
  ClientProxy,
  ClientsModule,
} from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePatientReqDto } from 'src/adapters/dto/request/create-patient-req.dto';
import { Response } from 'src/shared/classes/response.class';
import { AppService } from './app.service';

describe('ApiGateway-Hospital-Service', () => {
  let service: AppService;
  let patientClient: ClientProxy;

  //Mock Dto
  const createPatienDto1 = new CreatePatientReqDto();
  createPatienDto1.ID = '10000';
  createPatienDto1.First_name = 'Jon';
  createPatienDto1.Last_name = 'Snow';
  createPatienDto1.Email = 'email@email.com';
  createPatienDto1.Phone = '999777532';

  const createPatienDto2 = new CreatePatientReqDto();
  createPatienDto2.ID = '10001';
  createPatienDto2.First_name = 'Tor';
  createPatienDto2.Last_name = 'Fall';
  createPatienDto2.Email = 'email@hotmail.com';
  createPatienDto2.Phone = '981369123';

  //Mock List
  const listPatients = [
    {
      Patient_ID: 1,
      ID: '10000',
      First_name: 'Jon',
      Last_name: 'Snow',
      Email: 'email@email.com',
      Phone: '999777532',
    },
    {
      Patient_ID: 2,
      ID: '10001',
      First_name: 'Tor',
      Last_name: 'Son',
      Email: 'email@hotmail.com',
      Phone: '994465531',
    },
  ];

  //Mock Responses
  const resCreate = (dto: CreatePatientReqDto) =>
    new Response({
      statusCode: HttpStatus.OK,
      message: 'Patient registered.',
      data: dto,
    });
  const resList = (list: Array<any>) =>
    new Response({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'List patients.',
      data: list,
    });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AppService,
          useValue: {
            createPatient: jest.fn().mockResolvedValue(resCreate(createPatienDto1)),
            getAllPatients: jest.fn().mockResolvedValue(resList(listPatients)),
            getHello: jest.fn().mockResolvedValue(resList(listPatients)),
          }
        },
        {
          provide: ClientProxy,
          useValue: {
            send: jest.fn().mockResolvedValue({ statusCode: 200 }),
          },
        },
      ],
      imports: [
        ClientsModule.register([
          {
            name: 'PATIENT_SERVICE',
          },
        ]),
      ],
    }).compile();
    service = module.get<AppService>(AppService);
    patientClient = module.get<ClientProxy>(ClientProxy);
  });

  //const useCase = service.findAll;
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(patientClient).toBeDefined();
  });

  describe('createPatient', () => {
    it('should be defined', async () => {
      const createResponse = await service.createPatient(createPatienDto1);
      expect(createResponse).toEqual(resCreate(createPatienDto1));
      //expect(patientClient.send).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllPatients', () => {
    it('should be defined', async () => {
      const listResponse = await service.getAllPatients();
      expect(listResponse).toEqual(resList(listPatients));
      //expect(patientClient.send).toHaveBeenCalledTimes(1);
    });
  });
});
