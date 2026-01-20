import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class StopDto {
  @ApiProperty()
  @IsString()
  name: string;
  @IsString()
  location: string;
}

export class CreateRouteDto {
  @IsString()
  name: string;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @ApiProperty({ type: [StopDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StopDto)
  stops?: StopDto[];
}
