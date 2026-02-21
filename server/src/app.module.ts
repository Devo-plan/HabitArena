import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ChallengesModule } from './modules/challenges/challenges.module';
import { SquadsModule } from './modules/squads/squads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/habitarena', {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    }),
    AuthModule,
    UsersModule,
    RoomsModule,
    ChallengesModule,
    SquadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
