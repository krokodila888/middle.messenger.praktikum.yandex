import Block from '../../tools/Block';
import './logo.scss';

import LogoRaw from './logo.hbs?raw';

interface Props {
  [key: string]: string;
}

export class Logo extends Block {
  constructor(props: Props) {
    super('div', { ...props });
  }

  override render() {
    return LogoRaw;
  }
}
