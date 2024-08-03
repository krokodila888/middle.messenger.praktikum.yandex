//import { chatAPI } from '@shared/api/ChatApi'
//import { WSTransport, WSTransportEvents } from '@shared/lib/WSTransport'
/*import { User } from '@entities/User'
import { DialogItem } from '@widgets/DialogItem'
import { ApiError } from '@shared/api/model'
import { getMessageTime } from '@shared/utils/getMessageTime'
import { Chat, WSConnection, WSMessageData } from '../model'*/
import store from '../tools/Store'
import HTTPTransport from '../utils/api'
import { TChatInfo2, TTokenResponce, WSConnection } from '../types/types'
import { WSTransport } from '../tools/Websocket';

const getuserAPIInstance = new HTTPTransport();
const getchatsAPIInstance = new HTTPTransport();
const getUsersAPIInstance = new HTTPTransport();
const openChatAPIInstance = new HTTPTransport();

class ChatController {
  WSConnections: WSConnection[] = [];


    //это у нас есть как будто
    /*async getChats(offset?: number, limit?: number, title?: string): Promise<string | Chat[]> {
        try {
            const chats = await chatAPI.getChats(offset, limit, title) as unknown as Chat[]
            store.dispatch({ type: 'SET_CHATS', chats })
            console.log(store.getState().chats, 'chats');

            return chats
        } catch (err) {
            const error = err as ApiError
            return error.reason
        }
    }*/

    //тут для чатов открываются сокеты - так мы тоже можем
    async createConnections() {
      this.WSConnections.length = 0;
      const chats = store.getState().chats;
      const userid = store.getState().user.id;

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
            console.log(token);
            console.log('socket');
            const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userid}/${id}/${token}`);
            socket.connect();
            this.WSConnections.push({
              [chat.id]: socket,
            })
            /*.then(() => {
              socket.send({
                content: "0",
                type: "get old"
              })
            })  */                         
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



    /*updateDialogsListItem(chat: Chat, dialogItem: DialogItem) {
        const chatId = chat.id
        const connection = this.getConnectionById(chatId)

        connection?.on(WSTransportEvents.MESSAGE, async (data: WSMessageData) => {
            const newChats = store.getState().chats

            if (data.type === 'message') {
                if (Array.isArray(newChats)) {
                    newChats.forEach(async (newChat) => {
                        if (newChat.id === chatId) {
                            const lastMessageUsers = await chatAPI.getChatUsers(chatId) as unknown as User[]
                            const lastMessageUser = lastMessageUsers.find((user) => {
                                if (user.id && user.id === Number(data.user_id)) {
                                    return user
                                }
                                return null
                            })

                            console.log(lastMessageUser);
                            if (lastMessageUser) {
                                const unreadCount = await chatAPI.getUnreadMessagesCount(chatId) as unknown as { unread_count: number }
                                const messageName = lastMessageUser.display_name
                                    ? `${lastMessageUser.display_name}: `
                                    : `${lastMessageUser.first_name}: `

                                dialogItem.setProps({
                                    message: data.content,
                                    time: getMessageTime(data.time),
                                    count: unreadCount.unread_count,
                                    messageName,
                                })
                            }
                        }
                    })
                }
            }
        })
    }*/

    /*async deleteUserFromChat(chatId: number, userId: number) {
        await chatAPI.removeUser(chatId, userId)
    }*/
}

export const chatController = new ChatController()