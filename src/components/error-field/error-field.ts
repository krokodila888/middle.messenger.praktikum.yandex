import './error-field.scss';
import Block from '../../tools/Block';
import ErrorFieldRaw from './error-field.hbs?raw';

interface Props {
  [key: string]: string;
}

export class ErrorField extends Block {
  constructor(props: Props) {
    super({ ...props
    });
  }
  render() {
    return ErrorFieldRaw;
  }
}
