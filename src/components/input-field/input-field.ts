import './input-field.scss';
import InputFieldRaw from './input-field.hbs?raw';
import Block from '../../tools/Block';
import { Input } from '../input/input';

interface Props {
  [key: string]: string;
}

export class InputField extends Block {
  constructor(props: Props) {
    super({
      ...props,
      input: new Input({
        className: props.className,
        placeholder: props.placeholder,
        name: props.name,
        required: props.required,
        min: props.min,
        max: props.max,
        autocomplete: props.autocomplete,
        pattern: props.pattern,
      })
      });
    }
  render() {
    return InputFieldRaw;
  }
}
