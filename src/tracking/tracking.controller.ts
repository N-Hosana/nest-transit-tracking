import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TrackingService } from './tracking.service';
import { UserRole } from '../users/entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('tracking')
@ApiBearerAuth() // JWT Bearer auth for Swagger UI
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER) // Both admin and user can access
  @Get(':busId/eta')
  @ApiOperation({ summary: 'Get ETA for bus to next stop' })
  @ApiResponse({ status: 200, description: 'Returns ETA in minutes' })
  @ApiResponse({ status: 404, description: 'Bus or route not found' })
  async getETA(@Param('busId') busId: string): Promise<{ etaMinutes: number }> {
    const eta = await this.trackingService.calculateETA(busId);
    return { etaMinutes: eta };
  }
}
