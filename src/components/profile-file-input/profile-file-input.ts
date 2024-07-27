import './profile-file-input.scss';
import ProfileFileInputRaw from './profile-file-input.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class ProfileFileInput extends Block {
  constructor(props: Props) {
    super({ ...props,
    });
  }
  render() {
    return ProfileFileInputRaw;
  }
}
