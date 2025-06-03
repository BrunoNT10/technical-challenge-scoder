import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WebSocketServer
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProductGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ProductGateway.name)
  @WebSocketServer() server: Server
  
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  sendNewProduct(productItem: Record<string, any>) {
    this.server.emit('new_product_item', productItem)
    this.logger.log(`New product sent by web socket: ${productItem}`)
  }
  
  sendUpdatedProduct(productItem: Record<string, any>) {
    this.server.emit('updated_product_item', productItem)
    this.logger.log(`Updated product sent by web socket: ${productItem}`)
  }
  
  sendDeletedProduct(id: number) {
    this.server.emit('deleted_product_item', id)
    this.logger.log(`Deleted product sent by web socket: ${id}`)
  }
}
