import { Socket as IOSocket } from 'socket.io';

export interface SocketExt extends IOSocket {
  data: {
    roomID: string;
    memberDetails: {
      name: string;
      avatar: string;
    };
    score: number;
  };
}
