import EventBus from './EventBus';
import store from './Store';

enum WSACTIONS {
  WS_CONNECTION_START = 'WS_CONNECTION_START',
  WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED',
  WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR',
  WS_GET_MESSAGE = 'WS_GET_MESSAGE'
};

/*export type TWSStoreActions = {
  wsOpen: typeof WSACTIONS.WS_CONNECTION_START,
  onClose: typeof WSACTIONS.WS_CONNECTION_CLOSED,
  onError: typeof WSACTIONS.WS_CONNECTION_ERROR,
  onMessage: typeof WSACTIONS.WS_GET_MESSAGE,
};*/

const wsUrl: string = 'https://ya-praktikum.tech/api/v2/chats';

function onMessage(event: Event) {
  console.log((event as MessageEvent).data);
}

export class WSTransport extends EventBus {
  private socket?: WebSocket;
  private pingInterval?: ReturnType<typeof setInterval>;
  private pingIntervalTime = 30000;
  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('Not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error('Is already connected');
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
  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
    }

  public setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' })
    }, this.pingIntervalTime);

    this.on(WSACTIONS.WS_CONNECTION_CLOSED, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    })
  }

  private subscribe(socket: WebSocket) {
    //socket.addEventListener('message', onMessage);
    socket.addEventListener('open', () => this.emit(WSACTIONS.WS_CONNECTION_START))
    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data);
        if (['pong', 'user connected'].includes(data?.type)) {
          return
        }
        this.emit(WSACTIONS.WS_GET_MESSAGE, data);
      } catch (error) {
        console.log(error);
      }
    })
    socket.addEventListener('close', () => this.emit(WSACTIONS.WS_CONNECTION_CLOSED));
    socket.addEventListener('error', (e) => this.emit(WSACTIONS.WS_CONNECTION_ERROR, e));
  }
}
