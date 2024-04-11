import { Test, TestingModule } from '@nestjs/testing';
import { SensorValuesController } from './sensor-values.controller';
import { SensorValuesService } from './sensor-values.service';

describe('SensorValuesController', () => {
  let controller: SensorValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorValuesController],
      providers: [SensorValuesService],
    }).compile();

    controller = module.get<SensorValuesController>(SensorValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
