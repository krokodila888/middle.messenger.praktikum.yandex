import './button.scss';
import Block from '../../tools/Block';
import ButtonRaw from './button.hbs?raw';

interface Props {
  [key: string]: string;
}

export class Button extends Block {
  constructor(props: Props) {
    super('button', { ...props
    });
  }
  override render() {
    return ButtonRaw;
  }
}
