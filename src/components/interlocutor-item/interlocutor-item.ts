import './interlocutor-item.scss';
import InterlocutorItemRaw from './interlocutor-item.hbs?raw';
import { DeleteChatButton, AddUserInput, ChatAvatarInput } from './../../components';
import Block from '../../tools/Block';

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
