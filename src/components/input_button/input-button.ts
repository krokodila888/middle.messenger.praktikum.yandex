import './input-button.scss';
import Block from '../../tools/Block';
import InputButtonRaw from './input-button.hbs?raw';
import { validateProfilePassword } from '../../utils/validation';
import SetAvatarAPI from '../../api/edit-avatar-api';
import ChangePasswordAPI from '../../api/edit-password-api';

interface Props {
  [key: string]: string;
}

export class InputButton extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: (e: Event) => {
          if ((e.target as HTMLElement)!.id === 'newPasswordButton') {
          const input1 = document.getElementById('newPassword') as HTMLInputElement;
          const input2 = document.getElementById('oldPassword') as HTMLInputElement;
          e.preventDefault();
          validateProfilePassword(e, input1);
          validateProfilePassword(e, input2);
          const res = {
            oldPassword: input2.value,
            newPassword: input1.value,
          };
          const changepasswordApi = new ChangePasswordAPI;
          changepasswordApi.request(res);
        }
        if ((e.target as HTMLElement)!.id === 'avatarButton')  {
          e.preventDefault();
          const formdata = new FormData(document.createElement('form') as HTMLFormElement);
          const input = (<HTMLInputElement>document.querySelector('input[type="file"]'));
          if (input !== null && input instanceof HTMLInputElement && input.files) {
            formdata.append('avatar', input.files[0], input.files[0].name);
            const getavatarApi = new SetAvatarAPI;
            getavatarApi.request(formdata);
          }
        }
      }
    }          
    })
  }
  render() {
    return InputButtonRaw;
  }
}
