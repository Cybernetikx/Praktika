import { ApiProperty } from '@nestjs/swagger';

export class GetSensorValuesDto {
  @ApiProperty()
  sensorId: number;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
}

export class GetSensorValuesQuery {
  @ApiProperty()
  startDate: string;
  @ApiProperty()
  endDate: string;
}
