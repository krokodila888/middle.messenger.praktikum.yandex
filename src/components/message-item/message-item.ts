import './message-item.scss';
import MessageItemRaw from './message-item.hbs?raw';
import Block from '../../tools/Block';
import store from '../../tools/Store';
import { chatController } from '../../controllers/chats-controller';

interface Props {
  [key: string]: string;
}

export class MessageItem extends Block {
  constructor(props: Props) {
    super({
      ...props
  })
  }
  render() {
    return MessageItemRaw;
  }
}
