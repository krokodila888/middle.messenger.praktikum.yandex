import './message-input.scss';
import MessageInputRaw from './message-input.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class MessageInput extends Block {
  constructor(props: Props) {
    super('div', {
      ...props
    });
  }
  override render() {
    return MessageInputRaw;
  }
}
