import { ApiProperty } from '@nestjs/swagger';

export class UpdateSensorDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true })
  comment: string | null;
}
