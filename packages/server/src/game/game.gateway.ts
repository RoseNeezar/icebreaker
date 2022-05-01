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
import {
  ICreateRoom,
  IJoinRoom,
  INextTurn,
  IStartGame,
  IStartSpin,
  WheelEvents,
} from 'src/utils/events';
import { SocketExt } from 'src/utils/socket';
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

  @SubscribeMessage(WheelEvents.setup)
  handleSetupMessage(client: SocketExt, data: string) {
    client.emit('connected');
  }

  @SubscribeMessage(WheelEvents.createRoom)
  handleCRMessage(client: SocketExt, data: ICreateRoom) {
    const arg: ICreateRoom = {
      ...data,
      client,
    };

    return this.gameService.createRoom(arg);
  }

  @SubscribeMessage(WheelEvents.joinRoom)
  handleJMMessage(client: SocketExt, data: IJoinRoom) {
    const arg: IJoinRoom = {
      ...data,
      client,
    };
    return this.gameService.joinRoom(arg);
  }

  @SubscribeMessage(WheelEvents.nextTurn)
  handleNTMessage(client: SocketExt, data: INextTurn) {
    client.emit('connected');
  }

  @SubscribeMessage(WheelEvents.startGame)
  handleSGMessage(client: SocketExt, data: IStartGame) {
    client.emit('connected');
  }

  @SubscribeMessage(WheelEvents.startSpin)
  handleSSMessage(client: SocketExt, data: IStartSpin) {
    client.emit('connected');
  }

  async handleDisconnect(client: SocketExt) {
    this.logger.log(`Client disconnected: `);
  }

  handleConnection(client: SocketExt, ...args: any[]) {
    this.logger.log(`Client connected: `);
  }
}
