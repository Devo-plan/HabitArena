import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ListChallengesDto } from './dto/list-challenges.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateChallengeDto, @CurrentUser() user: CurrentUserPayload) {
    return this.challengesService.create(dto, user.userId);
  }

  @Get()
  findAll(@Query() dto: ListChallengesDto) {
    return this.challengesService.findAll(dto);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  getMyChallenges(@Query() dto: ListChallengesDto, @CurrentUser() user: CurrentUserPayload) {
    return this.challengesService.getMyChallenges(user.userId, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateChallengeDto,
    @CurrentUser() user: CurrentUserPayload
  ) {
    return this.challengesService.update(id, dto, user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.challengesService.remove(id, user.userId);
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  join(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.challengesService.join(id, user.userId);
  }

  @Post(':id/leave')
  @UseGuards(JwtAuthGuard)
  leave(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.challengesService.leave(id, user.userId);
  }

  @Patch(':id/progress')
  @UseGuards(JwtAuthGuard)
  updateProgress(
    @Param('id') id: string,
    @Body() dto: UpdateProgressDto,
    @CurrentUser() user: CurrentUserPayload
  ) {
    return this.challengesService.updateProgress(id, user.userId, dto.progress);
  }
}
