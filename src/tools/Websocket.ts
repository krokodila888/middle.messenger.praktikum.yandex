import EventBus from './EventBus';
import store from './Store';

enum WSACTIONS {
  WS_CONNECTION_START = 'WS_CONNECTION_START',
  //WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS',
  WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED',
  WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR',
  WS_GET_MESSAGE = 'WS_GET_MESSAGE'
};

const wsUrl: string = 'https://ya-praktikum.tech/api/v2/chats';

export class WSTransport extends EventBus {
    private socket?: WebSocket
    private pingInterval?: ReturnType<typeof setInterval>
    private readonly pingIntervalTime = 30000
    private url: string

    constructor(url: string) {
        super()
        this.url = url
    }

    public send(data: string | number | object) {
        if (!this.socket) {
            throw new Error('Socket is not connected')
        }

        this.socket.send(JSON.stringify(data))
    }

    public connect(): Promise<void> {
        if (this.socket) {
            throw new Error('Socket is already connected')
        }
        this.socket = new WebSocket(this.url)
        this.subscribe(this.socket)
        this.setupPing()

        return new Promise((resolve, reject) => {
            this.on(WSACTIONS.WS_CONNECTION_ERROR, reject)
            this.on(WSACTIONS.WS_CONNECTION_START, () => {
              console.log('Connected');

                this.off(WSACTIONS.WS_CONNECTION_ERROR, reject)
                resolve()
            })
        })
    }
    public close() {
        this.socket?.close()
        clearInterval(this.pingInterval)
    }
    public setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({ type: 'ping' })
        }, this.pingIntervalTime)

        this.on(WSACTIONS.WS_CONNECTION_CLOSED, () => {
            clearInterval(this.pingInterval)
            this.pingInterval = undefined
        })
    }
    private subscribe(socket: WebSocket) {
      socket.addEventListener('message', function(event) {
        console.log(event.data)
      });
        socket.addEventListener('open', () => this.emit(WSACTIONS.WS_CONNECTION_START))
        socket.addEventListener('close', () => this.emit(WSACTIONS.WS_CONNECTION_CLOSED))
        socket.addEventListener('error', (e) => this.emit(WSACTIONS.WS_CONNECTION_ERROR, e))
        socket.addEventListener('message', (message) => {
            try {
                const data = JSON.parse(message.data)
                if (['pong', 'user connected'].includes(data?.type)) {
                    return
                }
                this.emit(WSACTIONS.WS_GET_MESSAGE, data)
            } catch (error) {
                console.log(error)
            }
        })
    }
}