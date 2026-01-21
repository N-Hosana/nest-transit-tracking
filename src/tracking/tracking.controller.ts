import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TrackingService } from './tracking.service';
@ApiTags('Tracking')
@ApiBearerAuth()
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}
  @Get(':busId/eta')
  @ApiOperation({ summary: 'Get ETA for bus to location' })
  @ApiResponse({ status: 200, description: 'Returns ETA in minutes' })
  @ApiResponse({ status: 404, description: 'Bus or route not found' })
  async getETA(@Param('busId') busId: string): Promise<{ etaMinutes: number }> {
    const eta = await this.trackingService.calculateETA(busId);
    return { etaMinutes: eta };
  }
}
