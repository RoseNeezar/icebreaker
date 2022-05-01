import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [
    RedisModule.forRoot({
      closeClient: true,
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [GameService, GameGateway],
})
export class GameModule {}
