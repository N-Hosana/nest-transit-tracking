import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateRouteDto } from './dto/create.dto';
import { RoutesService } from './route.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Routes')
@Controller('Routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @ApiOperation({ summary: 'Get all routes' })
  @ApiResponse({ status: 200, description: 'List of routes' })
  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Create a route (ADMIN ONLY)' })
  @ApiResponse({ status: 201, description: 'Route created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN role required' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @ApiOperation({ summary: 'Get a route by name' })
  @ApiResponse({ status: 200, description: 'Route details' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('name')
  findOne(@Param('name') id: string) {
    return this.routesService.findOne(id);
  }
}
