import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({
  path: '/game/socket.io',
  cors: {
    credentials: true,
    origin: 'http://localhost:3000',
  },
  transports: ['polling', 'websocket'],
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(private gameService: GameService) {}

  private logger: Logger = new Logger('MessageGateway');

  afterInit(server: Server) {
    this.gameService.socket = server;
  }

  @SubscribeMessage('setup')
  handleMessage(client: Socket, boardId: string) {
    client.join(boardId);
    client.emit('connected');
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: `);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: `);
  }
}
