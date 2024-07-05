import './chat-item.scss';
import Block from '../../tools/Block';
import ChatItemRaw from './chat-item.hbs?raw';

interface Props {
  [key: string]: string;
}

export class ChatItem extends Block {
  constructor(props: Props) {
    super('div', { ...props
    });
  }
  render() {
    return ChatItemRaw;
  }
}
