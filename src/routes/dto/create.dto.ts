import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class StopDto {
  @ApiProperty({
    description: 'Name of the stop',
    example: 'Kigali City Center',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Location/address of the stop',
    example: 'Downtown Kigali',
  })
  @IsString()
  location: string;
}

export class CreateRouteDto {
  @ApiProperty({
    description: 'Starting location of the route',
    example: 'Kimironko',
  })
  @IsString()
  from: string;

  @ApiProperty({
    description: 'Destination location of the route',
    example: 'Nyabugogo',
  })
  @IsString()
  to: string;

  @ApiProperty({
    type: [StopDto],
    required: false,
    description: 'Array of stops along the route',
    example: [
      { name: 'Kimironko', location: 'Starting Point' },
      { name: 'Downtown', location: 'City Center' },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StopDto)
  stops?: StopDto[];
}
