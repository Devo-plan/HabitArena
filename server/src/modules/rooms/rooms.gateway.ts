import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: '/rooms',
  cors: {
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RoomsGateway.name);
  private readonly roomUsers = new Map<string, Set<string>>(); // roomId -> Set of socketIds

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // Remove client from all rooms
    this.roomUsers.forEach((users, roomId) => {
      if (users.has(client.id)) {
        users.delete(client.id);
        client.leave(roomId);
        this.server.to(roomId).emit('user-left', {
          socketId: client.id,
          timestamp: new Date().toISOString(),
        });
      }
    });
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId?: string }
  ) {
    const { roomId, userId } = data;
    if (!roomId) {
      return { event: 'error', data: { message: 'roomId is required' } };
    }

    // Leave previous rooms (if any)
    this.roomUsers.forEach((users, prevRoomId) => {
      if (users.has(client.id)) {
        users.delete(client.id);
        client.leave(prevRoomId);
      }
    });

    // Join new room
    client.join(roomId);
    if (!this.roomUsers.has(roomId)) {
      this.roomUsers.set(roomId, new Set());
    }
    this.roomUsers.get(roomId)?.add(client.id);

    // Notify others in the room
    client.to(roomId).emit('user-joined', {
      socketId: client.id,
      userId,
      timestamp: new Date().toISOString(),
    });

    // Get current active users count
    const activeUsers = this.roomUsers.get(roomId)?.size || 0;

    this.logger.log(`Client ${client.id} joined room ${roomId} (${activeUsers} active)`);

    return {
      event: 'joined-room',
      data: {
        roomId,
        activeUsers,
        timestamp: new Date().toISOString(),
      },
    };
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId?: string }
  ) {
    const { roomId, userId } = data;
    if (!roomId) {
      return { event: 'error', data: { message: 'roomId is required' } };
    }

    const users = this.roomUsers.get(roomId);
    if (users?.has(client.id)) {
      users.delete(client.id);
      client.leave(roomId);

      // Notify others in the room
      client.to(roomId).emit('user-left', {
        socketId: client.id,
        userId,
        timestamp: new Date().toISOString(),
      });

      this.logger.log(`Client ${client.id} left room ${roomId}`);
    }

    return {
      event: 'left-room',
      data: {
        roomId,
        timestamp: new Date().toISOString(),
      },
    };
  }

  @SubscribeMessage('get-active-users')
  handleGetActiveUsers(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    const { roomId } = data;
    const activeUsers = this.roomUsers.get(roomId)?.size || 0;

    return {
      event: 'active-users',
      data: {
        roomId,
        activeUsers,
        timestamp: new Date().toISOString(),
      },
    };
  }
}
