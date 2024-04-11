import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSensorValueDto } from './dto/create-sensor-value.dto';
import { GetSensorValuesDto } from './dto/get-sensor-values.dto';

@Injectable()
export class SensorValuesService {
  constructor(private prisma: PrismaService) {}
  create(createSensorValueDto: CreateSensorValueDto) {
    return this.prisma.sensorValue.create({
      data: {
        ...createSensorValueDto,
      },
    });
  }

  findAll(request: GetSensorValuesDto) {
    return this.prisma.sensorValue.findMany({
      where: {
        sensorId: request.sensorId,
        timestamp: {
          gte: request.startDate,
          lte: request.endDate,
        },
      },
    });
  }
}
