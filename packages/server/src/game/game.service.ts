import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

type socketClient = {
  client: Socket;
};

@Injectable()
export class GameService {
  public socket: Server = null;

  constructor() {}
}
