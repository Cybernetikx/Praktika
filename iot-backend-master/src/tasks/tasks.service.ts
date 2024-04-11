import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SensorValuesService } from 'src/sensor-values/sensor-values.service';
import { SensorsService } from 'src/sensors/sensors.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly sensorsService: SensorsService,
    private readonly sensorValuesService: SensorValuesService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleGenerateValues() {
    const sensors = await this.sensorsService.findAll();

    for (const sensor of sensors) {
      await this.sensorValuesService.create({
        sensorId: sensor.id,
        timestamp: new Date(),
        value: Math.random() * 20,
      });
    }

    this.logger.debug('Generated sensor data');
  }
}
