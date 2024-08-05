import './fileinput-profile-field.scss';
import FileInputProfileFieldRaw from './fileinput-profile-field.hbs?raw';
import Block from '../../tools/Block';
import { InputButton, ProfileFileInput } from '..';

interface Props {
  [key: string]: string;
}

export class FileInputProfileField extends Block {
  constructor(props: Props) {
    super({
      ...props,
        inputFile: new ProfileFileInput({
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
        }),
        buttonDiv: new InputButton({
          name: props.name,
          spanident: props.spanident,
        })

      })
    }
  render() {
    return FileInputProfileFieldRaw;
  }
}
