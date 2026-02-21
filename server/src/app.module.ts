import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
