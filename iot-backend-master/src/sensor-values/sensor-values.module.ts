import { Module } from '@nestjs/common';
import { SensorValuesService } from './sensor-values.service';
import { SensorValuesController } from './sensor-values.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SensorValuesController],
  providers: [SensorValuesService, PrismaService],
})
export class SensorValuesModule {}
