import './interlocutor-item.scss';
import InterlocutorItemRaw from './interlocutor-item.hbs?raw';
import { DeleteChatButton, AddUserInput } from './../../components';
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
    })
  }
  render() {
    return InterlocutorItemRaw;
  }
}
