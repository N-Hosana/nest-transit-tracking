import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BusesService } from './buses.service';
import { AuthGuard } from '@nestjs/passport';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateBusDto } from './dto/create-bus.dto';

@ApiTags('Buses')
@Controller('Buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @ApiOperation({ summary: 'Get all buses' })
  @ApiResponse({ status: 200, description: 'List of buses' })
  @Get()
  findAll() {
    return this.busesService.findAll();
  }

  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Create a bus' })
  @ApiResponse({ status: 201, description: 'Bus created' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateBusDto) {
    return this.busesService.create(
      {
        plateNumber: dto.plateNumber,
        capacity: dto.capacity,
        price: dto.price,
        currentLocation: dto.currentLocation,
        driver: dto.driver,
      },
      dto.routeId,
    );
  }

  @ApiOperation({ summary: 'Get a bus by ID' })
  @ApiResponse({ status: 200, description: 'Bus details' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busesService.findOne(id);
  }
}
