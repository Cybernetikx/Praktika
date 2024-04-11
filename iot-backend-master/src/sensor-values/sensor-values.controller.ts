import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { SensorValuesService } from './sensor-values.service';
import { GetSensorValuesQuery } from './dto/get-sensor-values.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('sensor-values')
@UseGuards(JwtAuthGuard)
@Controller()
export class SensorValuesController {
  constructor(private readonly sensorValuesService: SensorValuesService) {}

  @Get('sensor/:sensorId/sensor-values')
  findAll(
    @Param('sensorId') sensorId: string,
    @Query() query: GetSensorValuesQuery,
  ) {
    return this.sensorValuesService.findAll({
      sensorId: +sensorId,
      startDate: new Date(query.startDate),
      endDate: new Date(query.endDate),
    });
  }
}
