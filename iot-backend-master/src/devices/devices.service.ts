import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createDeviceDto: CreateDeviceDto) {
    return this.prisma.device.create({
      data: {
        ...createDeviceDto,
        userId: userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .devices();
  }

  findOne(userId: number, id: number) {
    return this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .devices({
        where: {
          id: id,
        },
      });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.prisma.device.update({
      where: {
        id,
      },
      data: {
        ...updateDeviceDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.device.delete({
      where: {
        id,
      },
    });
  }
}
