import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateBusDto {
  @ApiProperty()
  @IsString()
  plateNumber: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsString()
  currentLocation: string;

  @ApiProperty()
  @IsString()
  routeId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  driver?: string;
}
