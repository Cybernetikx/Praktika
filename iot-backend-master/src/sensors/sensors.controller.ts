import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('sensors')
@UseGuards(JwtAuthGuard)
@Controller()
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post('sensors')
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get('devices/:deviceId/sensors')
  findAll(@Param('deviceId') deviceId: string) {
    return this.sensorsService.findAllByDevice(+deviceId);
  }

  @Get('devices/:deviceId/sensors/:id')
  findOne(@Param('deviceId') deviceId: string, @Param('id') id: string) {
    return this.sensorsService.findOne(+id);
  }

  @Patch('sensors/:id')
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(+id, updateSensorDto);
  }

  @Delete('sensors/:id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(+id);
  }
}
