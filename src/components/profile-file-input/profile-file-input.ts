import './profile-file-input.scss';
import ProfileFileInputRaw from './profile-file-input.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class ProfileFileInput extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        change: (e: Event) => {
          e.preventDefault();
          const input = (<HTMLInputElement>document.querySelector('input[type="file"]'));
          const label = document.querySelector('.fileinput-profile-field__input');
          console.log(label);
          if (input.files) {
            (<HTMLLabelElement>label).textContent = input.files[0].name;
          }
      }
    }   
    });
  }
  render() {
    return ProfileFileInputRaw;
  }
}
