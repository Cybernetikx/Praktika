import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true })
  comment: string | null;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
}
