import {
  Controller,
  Get,
  Post,
  Body,
  Param,
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
  findAll() {
    return this.squadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.squadsService.findOne(id, user.userId);
  }

  @Post('join')
  @HttpCode(HttpStatus.OK)
  join(@Body() joinSquadDto: JoinSquadDto, @CurrentUser() user: CurrentUserPayload) {
    return this.squadsService.join(joinSquadDto, user.userId);
  }
}
