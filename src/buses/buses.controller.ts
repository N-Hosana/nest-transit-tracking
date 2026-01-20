import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BusesService } from './buses.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

class CreateDto {
  plateNumber: string;
  capacity?: number;
  routeId?: string;
}

@ApiTags('buses')
@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @ApiOperation({ summary: 'Get all buses' })
  @ApiResponse({ status: 200, description: 'List of buses' })
  @Get()
  findAll() {
    return this.busesService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a bus' })
  @ApiResponse({ status: 201, description: 'Bus created' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createDto: CreateDto) {
    const { routeId, ...busData } = createDto;
    return this.busesService.create(busData, routeId);
  }

  @ApiOperation({ summary: 'Get a bus by ID' })
  @ApiResponse({ status: 200, description: 'Bus details' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busesService.findOne(id);
  }
}
