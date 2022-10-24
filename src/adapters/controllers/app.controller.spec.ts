import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from 'src/application/app.service';
import { Response } from 'src/shared/classes/response.class';
import { AppModule } from 'src/app.module';
import { HttpStatus } from '@nestjs/common/enums';
import { CreatePatientReqDto } from '../dto/request/create-patient-req.dto';

describe('ApiGateway-Hospital-Controller', () => {
  let controller: AppController;
  let service: AppService;

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
  const listPatients = [{
    Patient_ID: 1,
    ID : '10000',
    First_name : 'Jon',
    Last_name : 'Snow',
    Email : 'email@email.com',
    Phone : '999777532'
  }, {
    Patient_ID: 2,
    ID : '10001',
    First_name : 'Tor',
    Last_name : 'Son',
    Email : 'email@hotmail.com',
    Phone : '994465531'
  }];

  //Mock Responses
  const resCreate = (dto: CreatePatientReqDto) => new Response({
    statusCode: HttpStatus.OK,
    message: 'Patient registered.',
    data: dto,
  });
  const resList = (list: Array<any>) => new Response({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'List patients.',
    data: list,
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      //imports: [AppModule],
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            createPatient: jest.fn().mockResolvedValue(resCreate(createPatienDto1)),
            getAllPatients: jest.fn().mockResolvedValue(resList(listPatients)),
          },
        },
      ],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('patient.create', () => {
    it('should create a patient', async () => {
      const responseCreate = await controller.createPatient(createPatienDto1);
      expect(service.createPatient).toHaveBeenCalledTimes(1);
      expect(responseCreate).toEqual(resCreate(createPatienDto1));
    });
  });

  describe('patient.finAll', () => {
    it('should return list patients', async () => {
      const responseList = await controller.getAllPatients();
      expect(service.getAllPatients).toHaveBeenCalledTimes(1);
      expect(responseList).toEqual(resList(listPatients));
    });
  });
});
