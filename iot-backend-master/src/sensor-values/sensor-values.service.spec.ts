import { Test, TestingModule } from '@nestjs/testing';
import { SensorValuesService } from './sensor-values.service';

describe('SensorValuesService', () => {
  let service: SensorValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorValuesService],
    }).compile();

    service = module.get<SensorValuesService>(SensorValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
