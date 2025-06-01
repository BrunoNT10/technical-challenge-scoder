import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // ajuste conforme necessário
  },
})
export class ProductGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    console.log(`Message from ${client.id}:`, data);
    client.broadcast.emit('message', data); // envia para todos exceto o remetente
  }
}
