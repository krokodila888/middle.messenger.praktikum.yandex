import './input.scss';
import InputRaw from './input.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class Input extends Block {
  constructor(props: Props) {
    super('div', {
      ...props
    });
  }
  override render() {
    return InputRaw;
  }
}
