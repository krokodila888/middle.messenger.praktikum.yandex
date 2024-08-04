import './message-item.scss';
import MessageItemRaw from './message-item.hbs?raw';
import Block from '../../tools/Block';

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
