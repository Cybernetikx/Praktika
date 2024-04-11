import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true })
  comment: string | null;
  @ApiProperty()
  deviceId: number;
}
