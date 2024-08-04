import './add-messages-button.scss';
import Block from '../../tools/Block';
import AddMessagesButtonRaw from './add-messages-button.hbs?raw';
import { chatController } from '../../controllers/chats-controller';
import store from '../../tools/Store';

interface Props {
  [key: string]: string;
}

export class AddMessagesButton extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const id = store.getState().currentChat.id;
          const num = store.getState().messages.length;
          const currentSocket = chatController.WSConnections.find((connection) => connection[id]);
            currentSocket![id].send({
              content: `${num}`,
              type: "get old"
            });
        }}
    });
  }
  render() {
    return AddMessagesButtonRaw;
  }
}
