import './interlocutor-item.scss';
import InterlocutorItemRaw from './interlocutor-item.hbs?raw';
import { DeleteChatButton, AddUserInput, UserItem, ChatAvatarInput } from './../../components';
import Block, { IProps } from '../../tools/Block';
import store from '../../tools/Store';
import { TChatInfo1, TChatInfo2, TOtherUserType } from '../../types/types';

interface Props {
  [key: string]: string;
}

export class InterlocutorItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
      deletechatbutton: new DeleteChatButton({}),
      adduserinput: new AddUserInput({}),
      changechatavataritem: new ChatAvatarInput({})
    })
  }


  render() {
    return InterlocutorItemRaw;
  }
}
