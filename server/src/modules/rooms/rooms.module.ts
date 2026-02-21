import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { RitualRoom, RitualRoomSchema } from './schemas/ritual-room.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RitualRoom.name, schema: RitualRoomSchema }])],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway],
  exports: [RoomsService],
})
export class RoomsModule {}
