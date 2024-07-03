import Block from '../../tools/Block';
import './chat-icon.scss';
import ChatIconRaw from './chat-icon.hbs?raw';

interface Props {
  [key: string]: string;
}

export class ChatIcon extends Block {
  constructor(props: Props) {
    super('img', { ...props });
  }

  override render() {
    return ChatIconRaw;
  }
}
