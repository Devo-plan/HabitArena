import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SquadsService } from './squads.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { JoinSquadDto } from './dto/join-squad.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';

@Controller('squads')
@UseGuards(JwtAuthGuard, ThrottlerGuard)
export class SquadsController {
  constructor(private readonly squadsService: SquadsService) {}

  @Post()
  create(@Body() createSquadDto: CreateSquadDto, @CurrentUser() user: CurrentUserPayload) {
    return this.squadsService.create(createSquadDto, user.userId);
  }

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.squadsService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10
    );
  }

  @Post('join')
  @HttpCode(HttpStatus.OK)
  join(@Body() joinSquadDto: JoinSquadDto, @CurrentUser() user: CurrentUserPayload) {
    return this.squadsService.join(joinSquadDto, user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.squadsService.findOne(id, user.userId);
  }

  @Post(':id/leave')
  @HttpCode(HttpStatus.NO_CONTENT)
  leave(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.squadsService.leave(id, user.userId);
  }

  @Delete(':id/members')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeSelf(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.squadsService.leave(id, user.userId);
  }
}
