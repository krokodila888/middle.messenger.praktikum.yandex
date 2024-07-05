import './input.scss';
import InputRaw from './input.hbs?raw';
import Block from '../../tools/Block';
import { validate } from '../../utils/validation';

interface Props {
  [key: string]: string;
}

export class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        blur: (e: FocusEvent) => validate(e),
        },
      });
    }

  render() {
    return InputRaw;
  }
}
