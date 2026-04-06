type MessageHandler = (data: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private handlers: Set<MessageHandler> = new Set();
  private deviceId: string | null = null;
  private reconnectTimeout: number = 5000;

  connect(deviceId: string) {
    this.deviceId = deviceId;
    if (this.socket) {
      this.socket.close();
    }

    const wsUrl = `ws://localhost:5001/ws/${deviceId}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket Connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handlers.forEach((handler) => handler(data));
    };

    this.socket.onclose = () => {
      console.log('WebSocket Closed. Reconnecting...');
      setTimeout(() => this.connect(deviceId), this.reconnectTimeout);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  subscribe(handler: MessageHandler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.handlers.clear();
  }
}

export const wsService = new WebSocketService();
