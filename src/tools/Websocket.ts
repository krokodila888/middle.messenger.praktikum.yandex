import EventBus from './EventBus';
import store from './Store';

enum WSACTIONS {
  WS_CONNECTION_START = 'WS_CONNECTION_START',
  WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED',
  WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR',
  WS_GET_MESSAGE = 'WS_GET_MESSAGE'
};

export class WSTransport extends EventBus {
  socket?: WebSocket;
  url: string;  
  pingInterval?: ReturnType<typeof setInterval>;
  pingTime = 10000;

  constructor(url: string) {
    super();
    this.url = url;
  }

  send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('Not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  connect(): Promise<void> {
    if (this.socket) {
      throw new Error('Already connected');
    };
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSACTIONS.WS_CONNECTION_ERROR, reject);
      this.on(WSACTIONS.WS_CONNECTION_START, () => {
        console.log('Connected');
        this.off(WSACTIONS.WS_CONNECTION_ERROR, reject);
        resolve();
      })
    })
  }
  close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
    }

  setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ 
        type: 'ping' 
      })
    }, this.pingTime);

    this.on(WSACTIONS.WS_CONNECTION_CLOSED, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    })
  }

  subscribe(socket: WebSocket) {
    //socket.addEventListener('message', onMessage);
    socket.addEventListener('open', () => this.emit(WSACTIONS.WS_CONNECTION_START))
    socket.addEventListener('message', (message) => {
      try {
        /*if (typeof message === 'string') {
          return message;
        }*/
        const data = JSON.parse(message.data);
        if (['pong', 'user connected'].includes(data?.type)) {
          return
        }
        this.emit(WSACTIONS.WS_GET_MESSAGE, data);
      } catch (error) {
        console.log(error);
      }
    })
    socket.addEventListener('close', event => {
      if (event.wasClean) {
        this.emit(WSACTIONS.WS_CONNECTION_CLOSED);
        console.log('Соединение закрыто чисто');
      } else {
        this.emit(WSACTIONS.WS_CONNECTION_CLOSED);
        console.log('Обрыв соединения');
      };
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);})
    socket.addEventListener('error', (event) => {
      this.emit(WSACTIONS.WS_CONNECTION_ERROR, event);
      console.log('Ошибка', (event as ErrorEvent).message as string);
    });
  }
}
