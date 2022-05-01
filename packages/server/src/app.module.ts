import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
