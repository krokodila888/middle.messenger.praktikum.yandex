import { isArrayOrObject } from '../utils/is-plain-object';
import EventBus from './EventBus';
import store from './Store';

export enum WSACTIONS {
  WS_CONNECTION_START = 'connected',
  WS_CONNECTION_CLOSED = 'close',
  WS_CONNECTION_ERROR = 'error',
  WS_GET_MESSAGE = 'message'
};

export class WSTransport extends EventBus {
  socket?: WebSocket;
  url: string;  
  pingInterval?: ReturnType<typeof setInterval>;
  pingTime = 5000;

  constructor(url: string) {
    super();
    this.url = url;
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

  send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('Not connected');
    }
    if (this.socket.readyState !== 0) {

    this.socket.send(JSON.stringify(data));
    }
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

  close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  subscribe(socket: WebSocket) {
    //socket.addEventListener('message', onMessage);
    socket.addEventListener('open', () => this.emit(WSACTIONS.WS_CONNECTION_START))
    socket.addEventListener('message', (mesage) => {
      try {
        const data = JSON.parse(mesage.data)
        if (['pong', 'user connected'].includes(data?.type)) {
          return
        }
        this.emit(WSACTIONS.WS_GET_MESSAGE, data)
      } catch (e) {
        console.log(e)
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
