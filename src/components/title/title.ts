import './title.scss';
import Block from '../../tools/Block';
import TitleRaw from './title.hbs?raw';

interface Props {
  [key: string]: string;
}

export class Title extends Block {
  constructor(props: Props) {
    super({ ...props
    });
  }
  render() {
    return TitleRaw;
  }
}
