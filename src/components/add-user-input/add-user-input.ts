import './add-user-input.scss';
import AddUserInputRaw from './add-user-input.hbs?raw';
import Block from '../../tools/Block';
import CreareChatAPI from '../../api/chat-api';
import { TCreareChatRequest, TUserChatData } from '../../types/types';
import AddUserAPI from '../../api/add-user-api';
import store from '../../tools/Store';

interface Props {
  [key: string]: string;
}

export class AddUserInput extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const input = document.getElementById("add-user-input") as HTMLInputElement;
          type MyType = {
            [key: string]: string;
          };
          const res: TUserChatData = {};
          if (input) {
            res.login = input.value;
          };
          console.log(res);
          res.chatid = store.getState().currentChat.id;
          const adduserApi = new AddUserAPI;
          adduserApi.request(res as TUserChatData);
          input.value = '';
        }
      },
    });
  }
  render() {
    return AddUserInputRaw;
  }
}
