import './delete-chat-button.scss';
import DeleteChatButtonRaw from './delete-chat-button.hbs?raw';
import Block from '../../tools/Block';
import store from '../../tools/Store';
import DeleteChatAPI from '../../api/delete-chat-api';
import { TChatDeleteRequest } from '../../types/types';

interface Props {
  [key: string]: string;
}

export class DeleteChatButton extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const id = store.getState().currentChat.id;
          const data = {chatId: id};
          const deletechatApi = new DeleteChatAPI;
          deletechatApi.request(data as TChatDeleteRequest);
        }}})
  }
  render() {
    return DeleteChatButtonRaw;
  }
}
