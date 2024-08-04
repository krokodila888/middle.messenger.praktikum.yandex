import './chat-item.scss';
import Block from '../../tools/Block';
import ChatItemRaw from './chat-item.hbs?raw';
import store from '../../tools/Store';
import OpenChatAPI from '../../api/open-chat-api';

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
          /*const openChatApi = new OpenChatAPI;
          openChatApi.request({
            id: id,
            userid: store.getState().id
          });*/
        }}
    });
  }
  render() {
    return ChatItemRaw;
  }
}
