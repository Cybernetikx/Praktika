import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeviceDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true })
  comment: string | null;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
}
