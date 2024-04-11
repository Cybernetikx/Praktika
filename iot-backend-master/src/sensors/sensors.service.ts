import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  constructor(private prisma: PrismaService) {}
  create(createSensorDto: CreateSensorDto) {
    return this.prisma.sensor.create({
      data: {
        ...createSensorDto,
      },
    });
  }

  findAll() {
    return this.prisma.sensor.findMany({});
  }

  findAllByDevice(deviceId: number) {
    return this.prisma.sensor.findMany({
      where: {
        deviceId: deviceId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.sensor.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateSensorDto: UpdateSensorDto) {
    return this.prisma.sensor.update({
      where: {
        id: id,
      },
      data: {
        ...updateSensorDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.sensor.delete({
      where: {
        id: id,
      },
    });
  }
}
