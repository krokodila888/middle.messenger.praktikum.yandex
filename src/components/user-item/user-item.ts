import './user-item.scss';
import UserItemRaw from './user-item.hbs?raw';
import { DeleteUserButton } from './../../components';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class UserItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
      deleteuserbutton: new DeleteUserButton({ 
        id: props.id
      }),
    })
  }
  render() {
    return UserItemRaw;
  }
}
