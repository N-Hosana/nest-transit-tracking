import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { CreateRouteDto } from './dto/create.dto';
import { Roles } from '../auth/roles.decorator';
import { SearchRouteDto } from './dto/search.dto';
import { RoutesService } from './route.service';
import { UserRole } from '../users/entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @ApiOperation({ summary: 'Get all routes' })
  @ApiResponse({ status: 200, description: 'List of routes' })
  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a route' })
  @ApiResponse({ status: 201, description: 'Route created' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @ApiOperation({ summary: 'Create route (admin only)' })
  @Post('search')
  searchRoute(@Body() dto: SearchRouteDto) {
    return this.routesService.search(dto.from, dto.to);
  }

  @ApiOperation({ summary: 'Get a route by name' })
  @ApiResponse({ status: 200, description: 'Route details' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('name')
  findOne(@Param('name') id: string) {
    return this.routesService.findOne(id);
  }
}
