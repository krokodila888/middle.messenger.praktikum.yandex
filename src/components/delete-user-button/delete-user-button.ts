import './delete-user-button.scss';
import DeleteUserButtonRaw from './delete-user-button.hbs?raw';
import Block from '../../tools/Block';
import store from '../../tools/Store';
import { TDeleteUserRequest } from '../../types/types';
import DeleteUserAPI from '../../api/delete-user-api';

interface Props {
  [key: string]: string;
}

export class DeleteUserButton extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          const id = store.getState().currentChat.id;
          const data = {chatId: id, users: [Number((e.target as HTMLElement)?.id)]};
          const deleteuserApi = new DeleteUserAPI;
          deleteuserApi.request(data as TDeleteUserRequest);
        }}})
  }
  render() {
    return DeleteUserButtonRaw;
  }
}
