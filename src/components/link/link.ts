import './link.scss';
import Block from '../../tools/Block';
import LinkRaw from './link.hbs?raw';

interface Props {
  [key: string]: string;
}

export class Link extends Block {
  constructor(props: Props) {
    super('p', { ...props
    });
  }
  render() {
    return LinkRaw;
  }
}
