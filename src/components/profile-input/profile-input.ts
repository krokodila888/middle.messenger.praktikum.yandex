import './profile-input.scss';
import ProfileInputRaw from './profile-input.hbs?raw';
import Block from '../../tools/Block';
import { validateProfile } from '../../utils/validation';

interface Props {
  [key: string]: string;
}

export class ProfileInput extends Block {
  constructor(props: Props) {
    super('div', { ...props,
      events: {
        blur: (e: FocusEvent) => validateProfile(e),
      },
    });
  }
  render() {
    return ProfileInputRaw;
  }
}
