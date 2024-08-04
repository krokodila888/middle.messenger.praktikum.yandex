import './chat-avatar-input.scss';
import ChatAvatarInputRaw from './chat-avatar-input.hbs?raw';
import Block from '../../tools/Block';
import CreareChatAPI from '../../api/chat-api';
import { TCreareChatRequest, TUserChatData } from '../../types/types';
import AddUserAPI from '../../api/add-user-api';
import store from '../../tools/Store';
import SetChatAvatarAPI from '../../api/change-chat-avatar-api';

interface Props {
  [key: string]: string;
}

export class ChatAvatarInput extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
              const formdata = new FormData(document.createElement('form') as HTMLFormElement);
              const input = (<HTMLInputElement>document.querySelector('input[type="file"]'));
              console.log('add file');
              console.log(input)
              console.log(input.files);

              if (input !== null && input instanceof HTMLInputElement && input.files) {
                formdata.append('avatar', input.files[0], input.files[0].name);
                formdata.append('chatId', store.getState().currentChat.id);
                const getchatavatarApi = new SetChatAvatarAPI;
                getchatavatarApi.request(/*{ avatar: formdata, chatId: store.getState().currentChat.id}*/formdata);
                const label = document.querySelector('.chat-avatar-input__input');
                (<HTMLLabelElement>label).textContent = 'Add file';
            }
          },
        change: (e: Event) => {
          e.preventDefault();
          const input = (<HTMLInputElement>document.querySelector('input[type="file"]'));
          const label = document.querySelector('.chat-avatar-input__input');
          console.log(label);
          if (input.files) {
            (<HTMLLabelElement>label).textContent = input.files[0].name;
          }
        }
      },
    });
  }
  render() {
    return ChatAvatarInputRaw;
  }
}
