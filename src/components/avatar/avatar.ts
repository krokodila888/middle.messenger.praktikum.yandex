import Block from '../../tools/Block';
import './avatar.scss';

import AvatarRaw from './avatar.hbs?raw';

interface Props {
  [key: string]: string;
}

export class Avatar extends Block {
  constructor(props: Props) {
    super('img', { ...props });
  }

  override render() {
    return AvatarRaw;
  }
}
