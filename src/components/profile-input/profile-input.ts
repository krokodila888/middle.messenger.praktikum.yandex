import './profile-input.scss';
import ProfileInputRaw from './profile-input.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class ProfileInput extends Block {
  constructor(props: Props) {
    super('div', { ...props
    });
  }
  override render() {
    return ProfileInputRaw;
  }
}
