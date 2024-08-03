import store from '../tools/Store'
import HTTPTransport from '../utils/api'
import { TChatInfo2, TTokenResponce, WSConnection } from '../types/types'
import { WSACTIONS, WSTransport } from '../tools/Websocket';

const openChatAPIInstance = new HTTPTransport();

class ChatController {
  WSConnections: WSConnection[] = [];

    async createConnections() {
      this.WSConnections.length = 0;
      const chats = store.getState().chats;

      console.log('promise');
      const chatsWithSockets = (chats as TChatInfo2[]).map((chat) => {

      return openChatAPIInstance
        .post(`https://ya-praktikum.tech/api/v2/chats/token/${chat.id}`, {
            credentials: 'include',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
          })
          .then((xhr) => {
            const rawResponse = (xhr as XMLHttpRequest).responseText;
            const response = JSON.parse(rawResponse) as TTokenResponce;
            return response;
          })
          .then((response) => {
            const id = `${chat.id}`;
            const userid = `${store.getState().user.id}`;
            const token = response.token;
            //console.log(token);
            //console.log('socket');
            const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userid}/${id}/${token}`);
            socket.connect();
            this.WSConnections.push({
              [chat.id]: socket,
            })
          })
          .then(() => {
            const currentSocket = this.WSConnections.find((connection) => connection[chat.id]);
            console.log (currentSocket);
            currentSocket![chat.id].send({
              content: "0",
              type: "get old"
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            currentSocket![chat.id].on(WSACTIONS.WS_GET_MESSAGE, async (data: any) => {
              const сhats = store.getState().chats;
              const chat1 = chats.find((item: TChatInfo2) => item.id === chat.id);
              console.log('data');
              console.log(data);
              store.dispatch({
                type: 'SET_CHAT_MESSAGES',
                data: data,
                id: chat.id
              });
            })
          })                       
        });
        Promise.all(chatsWithSockets)
          .catch(error => {
            console.error(error)
          })
       console.log(this.WSConnections);
        return this.WSConnections
    }

    getConnectionById(chatId: number): WSTransport | undefined {
      const connection = this.WSConnections.find((connection) => connection[chatId])
      return connection && connection[chatId]
    }


}

export const chatController = new ChatController()