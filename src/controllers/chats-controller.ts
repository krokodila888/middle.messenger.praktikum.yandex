/* eslint-disable @typescript-eslint/no-explicit-any */
import store from '../tools/Store'
import HTTPTransport from '../utils/api'
import { TChatInfo2, TTokenResponce, WSConnection } from '../types/types'
import { WSTransport } from '../tools/Websocket';
import { BASE_URL } from '../utils/constants';

const openChatAPIInstance = new HTTPTransport();

export class ChatController {
  WSConnections: WSConnection[] = [];

  async createConnections() {
    this.WSConnections.length = 0;
    const chats = store.getState().chats;
    console.log('promise');
    const chatsWithSockets = (chats as TChatInfo2[]).map((chat) => {
    return openChatAPIInstance
    .post(`${BASE_URL}/chats/token/${chat.id}`, {
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
      const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userid}/${id}/${token}`);
      socket.connect();
      this.WSConnections.push({
        [chat.id]: socket,
      });
    })                      
    });
    Promise.all(chatsWithSockets)
    .catch(error => {
      console.error(error)
    })
    console.log(this.WSConnections);
    return this.WSConnections
  }

  async createConnection(data: {id: number}) {
    //const chat = store.getState().chats.find((item: TChatInfo2) => item.id === data.id);
    //console.log(chat);
    return openChatAPIInstance
    .post(`${BASE_URL}/chats/token/${data.id}`, {
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
      const id = `${data.id}`;
      const userid = `${store.getState().user.id}`;
      const token = response.token;
      const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userid}/${id}/${token}`);
      socket.connect();
      this.WSConnections.push({
        [data.id]: socket,
      });
    })
  }

  getConnectionById(chatId: number): WSTransport | undefined {
    const connection = this.WSConnections.find((connection) => connection[chatId])
    return connection && connection[chatId]
  }
}

export const chatController = new ChatController();
