import './input-profile-field.scss';
import InputProfileFieldRaw from './input-profile-field.hbs?raw';
import Block, { IProps } from '../../tools/Block';
import { ProfileInput, InputButton } from '../../components';
interface Props {
  [key: string]: string;
}
export class InputProfileField extends Block {
  constructor(props: Props) {
    super({
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
      }),
      buttonDiv: new InputButton({
        name: props.name,
        spanident: props.spanident,
      })
    })
  }
  componentDidUpdate(/*oldProps: IProps, */newProps: IProps): boolean {
    this.children.input.setProps({value: newProps.value});
    return true;
  }

  render() {
    return InputProfileFieldRaw;
  }
}
