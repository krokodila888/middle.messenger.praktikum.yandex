import './chat-item.scss';
import Block from '../../tools/Block';
import ChatItemRaw from './chat-item.hbs?raw';
import store from '../../tools/Store';

interface Props {
  [key: string]: string;
}

export class ChatItem extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const id =  Number((e.target as HTMLDivElement).id);
          document.querySelectorAll('.chat-item').forEach((item) => {
            item.classList.remove('chat-item_chosen')
          });
          (e.target as HTMLDivElement).classList.add('chat-item_chosen')
          store.dispatch({
            type: 'SET_CURRENTCHAT',
            id: id
          })
        }}
    });
  }
  render() {
    return ChatItemRaw;
  }
}
