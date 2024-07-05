import './input-profile-field.scss';
import InputProfileFieldRaw from './input-profile-field.hbs?raw';
import Block from '../../tools/Block';
import { ProfileInput } from '../profile-input/profile-input';

interface Props {
  [key: string]: string;
}

export class InputProfileField extends Block {
  constructor(props: Props) {
    super('label', {
      ...props,
      input: new ProfileInput({
        className: props.className,
        placeholder: props.placeholder,
        name: props.name,
        required: props.required,
        min: props.min,
        max: props.max,
        autocomplete: props.autocomplete,
        pattern: props.pattern,
        value: props.value,
        disabled: props.disabled,
        readonly: props.readonly,
      })
      });
    }
  render() {
    return InputProfileFieldRaw;
  }
}
