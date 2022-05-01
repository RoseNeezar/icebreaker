import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { RedisService } from 'nestjs-redis';

type socketClient = {
  client: Socket;
};

@Injectable()
export class GameService {
  public socket: Server = null;

  constructor(private readonly redisService: RedisService) {}

  async root(): Promise<boolean> {
    await this.redisService
      .getClient()
      .set('room', JSON.stringify({ data: 'some' }));
    return true;
  }
}
