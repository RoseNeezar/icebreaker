import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ICreateRoom, IJoinRoom } from 'src/utils/events';
import * as uuid from 'uuid';
import { SocketExt } from 'src/utils/socket';

type redisRoomStore = {
  host: string;
  gameStarted: boolean;
};

@Injectable()
export class GameService {
  public socket: Server = null;

  constructor(private readonly redisService: RedisService) {}

  async createRoom(data: ICreateRoom) {
    const { avatar, client, host_name } = data;
    try {
      const roomID = uuid.v4();
      const body: redisRoomStore = {
        host: client.id,
        gameStarted: false,
      };
      await this.redisService.getClient().set(roomID, JSON.stringify(body));

      client.data.roomID = roomID;
      client.data.memberDetails = {
        name: host_name,
        avatar,
      };
      client.data.score = 0;

      client.join(roomID);
      client.emit('roomID', roomID);

      const listOfSocket = await this.socket.fetchSockets();
      console.log(
        'list-',
        listOfSocket.map((r) => {
          return {
            data: r.data,
            id: r.id,
          };
        }),
      );
      for (let key of listOfSocket) {
        console.log('create_room--0', key.data.memberDetails);
      }
      // console.log('create-room', listOfSocket[0].data);

      return {
        status: 'Success',
      };
    } catch (err) {
      console.log(err);
      this.socket.emit('something_broke');
    }
  }

  async joinRoom(data: IJoinRoom) {
    const { avatar, name, roomId: roomID, client } = data;
    try {
      if (!uuid.validate(roomID)) {
        client.emit('invalid room');
        return;
      }

      const room = await this.redisService.getClient().get(roomID);
      if (room === null) {
        client.emit('invalid room');
        return;
      }

      client.join(roomID);
      client.data.roomID = roomID;
      const memberDetails = {
        name,
        avatar,
      };
      client.data.memberDetails = memberDetails;
      client.data.score = 0;

      /* create list of users already in room to send to player who just joined */
      let usersInThisRoom = [];

      const listOfSocket = await this.socket.fetchSockets();

      for (let key of listOfSocket) {
        if (key.id === roomID) {
          usersInThisRoom.push({
            socketID: key.id,
            memberDetails: key.data.memberDetails,
            score: key.data.score,
          });
        }
      }
      client.broadcast
        .to(roomID)
        .emit('new member', { socketID: client.id, memberDetails, score: 0 });

      const { gameStarted } = JSON.parse(
        await this.redisService.getClient().get(roomID),
      );
      if (gameStarted) {
        const { word, startTime, round_length, turn } = JSON.parse(
          await this.redisService.getClient().get(roomID + ' round'),
        );
        let wordLength = 0;
        if (word) {
          wordLength = word.length;
        }

        /*  send also the round length selected by host to the members
              since client wouldnt have that info if he joins after game starts
          */
        client.emit('members in this room', usersInThisRoom, {
          wordLength,
          startTime,
          round_length,
        });
        try {
          await this.redisService
            .getClient()
            .rpushx(roomID + ' members', client.id);
        } catch (err) {
          console.log(err);
          client.emit('something broke');
        }

        if (!word) {
          /*  this occurs when someone joins a room when some player is choosing a word,
                  it should happen after emitting "members in the room" event, so that client is able to listen to this
              */
          const listOfSocket = await this.socket.fetchSockets();
          const r = listOfSocket.find((s) => s.id === turn);

          client.emit('someone choosing word', r.data.memberDetails.name);
        }
      } else {
        client.emit('members in this room', usersInThisRoom);
      }
    } catch (err) {
      console.log(err);
      this.socket.emit('something_broke');
    }
  }

  async disconnect(client: SocketExt) {
    try {
      const roomID = client.data.roomID;
      if (!roomID) return;

      client.broadcast.to(roomID).emit('member left');

      let roomData = JSON.parse(
        await this.redisService.getClient().get(roomID),
      );

      const listOfSocket = await this.socket.fetchSockets();

      const roomDetails = listOfSocket.find((s) => s.id === roomID).data;
      if (!roomDetails) {
        // just in case a disconnect event triggered after room was deleted
        this.deleteRoom(roomID);
        return;
      }
      const members = listOfSocket.map((r) => r.id);
      const socketID = client.id;
      if (roomData.gameStarted) {
        /* if game started and only 1 member is left, it means that everyone else left, so end the game */
        if (members.length === 1) {
          // const scores = scoreManagement({ io, client, roomID })
          // client.broadcast.to(roomID).emit("game over", scores)
          this.deleteRoom(roomID);
          return;
        }
        client.broadcast.to(roomID).emit('someone left', socketID);
        const { turn } = JSON.parse(
          await this.redisService.getClient().get(roomID + ' round'),
        );
        /* if a player left the game while he was choosing a word, transfer turn to next player */
        if (socketID === turn) {
          // nextTurn({ io, socket })
        }
        await this.redisService
          .getClient()
          .lrem(roomID + ' members', 1, socketID);
      } else {
        /* if game not started, an members length in room is now zero, means host left and no body else had joined */
        if (members.length === 0) {
          this.deleteRoom(roomID);
          return;
        }
        client.broadcast.to(roomID).emit('someone left', socketID);
      }
      /* allot a new host if host leaves */
      if (roomData.host === socketID) {
        this.setNewHost(roomData, members[0], client);
      }
    } catch (err) {
      console.log(err);
      this.socket.emit('something broke');
    }
  }

  async setNewHost(
    roomData: redisRoomStore,
    newHost: string,
    client: SocketExt,
  ) {
    try {
      roomData.host = newHost;
      client.broadcast.to(newHost).emit('new host');
      await this.redisService
        .getClient()
        .set(client.data.roomID, JSON.stringify(roomData));
    } catch (err) {
      console.log(err);
      this.socket.emit('something_broke');
    }
  }

  async deleteRoom(roomID: string) {
    try {
      this.redisService.getClient().del(roomID);
      this.redisService.getClient().del(roomID + ' round');
      this.redisService.getClient().del(roomID + ' members');
    } catch (err) {
      console.log(err);
      this.socket.emit('something_broke');
    }
  }

  async nextTurn(client: SocketExt) {
    try {
      const roomID = client.data.roomID;
      const sockets = await this.redisService
        .getClient()
        .lrange(roomID + ' members', 0, -1);

      let roundData = JSON.parse(
        await this.redisService.getClient().get(roomID + ' round'),
      );
      if (roundData === null) return; // in case game got over due to only 1 or 0 members remaining in room

      let turnIndex = sockets.indexOf(roundData.turn);
      if (turnIndex === sockets.length - 1) {
        turnIndex = 0;
        let { numRounds, currentRound } = roundData;

        /* if the last player just was drawing and no. of rounds are done, then game over */
        if (numRounds === currentRound) {
          const scores = this.scoreManagement(client, roomID);
          client.in(roomID).emit('game over', scores);
          return;
        }
        currentRound += 1;
        roundData.currentRound = currentRound;
      } else {
        turnIndex += 1;
      }

      this.scoreManagement(client, roomID);
      // this.turn({ io, socketID: sockets[turnIndex], roomID, prevWord: roundData.word })

      roundData.turn = sockets[turnIndex];
      roundData.word = undefined;
      await this.redisService
        .getClient()
        .set(roomID + ' round', JSON.stringify(roundData));
    } catch (err) {
      console.log(err);
      this.socket.emit('something_broke');
    }
  }

  async scoreManagement(client: SocketExt, roomID: string) {
    let scoreSum = 0; // score sum for current round, used to calculate score for member who was drawing
    let numMembers = 0;
    const listOfSocket = await this.socket.fetchSockets();

    // const sockets = Object.keys(io.sockets.adapter.rooms[roomID].sockets)

    for (let socketID of listOfSocket) {
      const currentScore = socketID.data.currentScore;

      if (currentScore) {
        /* currentScore exists means player has already given the correct answer, so add up */
        scoreSum += currentScore;
      }

      /* make currentScore attribute undefined for next round */

      socketID.data.currentScore = undefined;
      numMembers += 1;
    }

    const drawerScore = Math.ceil(scoreSum / numMembers); // calculate score of player who was drawing
    client.data.score += drawerScore; // add it to his total score for the game
    if (drawerScore > 0) {
      /* send to the player his score for this round */
      client.emit('your score', drawerScore);
    }

    /* generate list of updated scorecard */
    let updatedScores = listOfSocket.map((socketID) => {
      const socketData = socketID.data;
      return {
        socketID: socketData.id,
        memberDetails: socketData.memberDetails,
        score: socketData.score,
      };
    });

    /* arrange scores in descending order i.e. rank wise */
    updatedScores = updatedScores.sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      }
      return 1;
    });

    /* send to everyone in the room the updated scorecard */
    client.in(roomID).emit('updated scores', updatedScores);
    return updatedScores;
  }
}
