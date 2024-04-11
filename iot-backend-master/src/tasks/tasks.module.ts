import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SensorValuesModule } from 'src/sensor-values/sensor-values.module';
import { SensorValuesService } from 'src/sensor-values/sensor-values.service';
import { SensorsModule } from 'src/sensors/sensors.module';
import { SensorsService } from 'src/sensors/sensors.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [SensorsModule, SensorValuesModule],
  providers: [TasksService, SensorsService, SensorValuesService, PrismaService],
})
export class TasksModule {}
