import { Socket } from 'socket.io';
import { SocketExt } from './socket';

export enum WheelEvents {
  setup = 'setup',
  createRoom = 'create_room',
  joinRoom = 'join_room',
  startGame = 'start_game',
  nextTurn = 'next_turn',
  startSpin = 'start_spin',
}

export interface ICreateRoom {
  client: SocketExt;
  host_name: string;
  avatar: string;
}

export interface IJoinRoom {
  client: SocketExt;
  roomId: string;
  name: string;
  avatar: string;
}

export interface INextTurn {}

export interface IStartGame {
  roundLength: number;
  numRounds: number;
}

export interface IStartSpin {}
