import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SquadsService } from './squads.service';
import { SquadsController } from './squads.controller';
import { Squad, SquadSchema } from './schemas/squad.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Squad.name, schema: SquadSchema }])],
  controllers: [SquadsController],
  providers: [SquadsService],
  exports: [SquadsService],
})
export class SquadsModule {}
