import './new-chat-input.scss';
import NewChatInputRaw from './new-chat-input.hbs?raw';
import Block from '../../tools/Block';
import CreareChatAPI from '../../api/chat-api';
import { TCreareChatRequest } from '../../types/types';

interface Props {
  [key: string]: string;
}

export class NewChatInput extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const input = document.getElementById("new-chat-input") as HTMLInputElement;
          type MyType = {
            [key: string]: string;
          };
          const res: MyType = {};
          if (input) {
            res[input.name] = input.value;
          };
          console.log(res);
          const createchatApi = new CreareChatAPI;
          createchatApi.request(res as  TCreareChatRequest);
        }
      },
    });
  }
  render() {
    return NewChatInputRaw;
  }
}
