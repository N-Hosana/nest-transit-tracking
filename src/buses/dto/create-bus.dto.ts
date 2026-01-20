import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateDto {
  @ApiProperty()
  @IsString()
  plateNumber: string;

  @ApiProperty({ required: false, default: 40 })
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  routeId?: number;
}
