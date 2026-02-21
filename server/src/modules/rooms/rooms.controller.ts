import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRitualRoomDto } from './dto/create-ritual-room.dto';
import { UpdateRitualRoomDto } from './dto/update-ritual-room.dto';
import { ListRoomsQueryDto } from './dto/list-rooms-query.dto';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() dto: CreateRitualRoomDto, @CurrentUser() user: CurrentUserPayload) {
    return this.roomsService.create(dto, user.userId);
  }

  @Get()
  findAll(@Query() query: ListRoomsQueryDto) {
    return this.roomsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRitualRoomDto,
    @CurrentUser() user: CurrentUserPayload
  ) {
    return this.roomsService.update(id, dto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.roomsService.remove(id, user.userId);
  }

  @Post(':id/join')
  join(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.roomsService.joinRoom(id, user.userId);
  }

  @Post(':id/leave')
  leave(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.roomsService.leaveRoom(id, user.userId);
  }
}
