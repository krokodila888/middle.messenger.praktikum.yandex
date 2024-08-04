import './chat-item.scss';
import Block from '../../tools/Block';
import ChatItemRaw from './chat-item.hbs?raw';
import store from '../../tools/Store';
import OpenChatAPI from '../../api/open-chat-api';
import { chatController } from '../../controllers/chats-controller';
import { WSACTIONS } from '../../tools/Websocket';
import { TChatInfo2 } from '../../types/types';
import { isArray } from '../../utils/is-plain-object';

interface Props {
  [key: string]: string;
}

export class ChatItem extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const current = (e.target as HTMLElement).closest('.chat-item');
          const id =  Number((current as HTMLDivElement).id);
          document.querySelectorAll('.chat-item').forEach((item) => {
            item.classList.remove('chat-item_chosen')
          });
          console.log(current as HTMLDivElement);
          
          store.dispatch({
            type: 'SET_CURRENTCHAT',
            id: id
          });
          (current as HTMLDivElement).classList.add('.chat-item_chosen');
          const currentSocket = chatController.WSConnections.find((connection) => connection[id]);
            console.log (currentSocket);
            currentSocket![id].send({
              content: "0",
              type: "get old"
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            currentSocket![id].on('message', async (data: any) => {
              console.log(data);
              if (isArray(data)) {
                console.log(data);
                store.dispatch({
                  type: 'SET_CHAT_MESSAGES',
                  messages: data
                })
              };
              if (data.type === 'message') {
                console.log(data);
                store.dispatch({
                  type: 'SET_CHAT_MESSAGE',
                  message: data,
                })
              }
              const messagesblock = document.querySelector(".current-chat__message-block");
              (messagesblock as HTMLDivElement).scrollTop = (messagesblock as HTMLDivElement).scrollHeight;
            })
        }}
    });
  }
  render() {
    return ChatItemRaw;
  }
}
