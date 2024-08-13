import './message-input.scss';
import MessageInputRaw from './message-input.hbs?raw';
import Block from '../../tools/Block';
import { chatController } from '../../controllers/chats-controller';
import store from '../../tools/Store';

interface Props {
  [key: string]: string;
}

export class MessageInput extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const input = document.getElementById('message');
          chatController.getConnectionById(store.getState().currentChat.id)!.send({
            content: (input as HTMLInputElement).value,
            type: "message"
          });
          (input as HTMLInputElement).value = '';
        }
      },
    });
  }
  render() {
    return MessageInputRaw;
  }
}
