import './input-button.scss';
import Block from '../../tools/Block';
import InputButtonRaw from './input-button.hbs?raw';
import { validateProfilePassword } from '../../utils/validation';
import { RegisterAPI } from '../../api/auth-api';
import HTTPTransport, { TOptions } from '../../utils/api';
import store from '../../tools/Store';
import Router from '../../tools/Router';
import cloneDeep from '../../utils/clone-deep';
import { anyBigLetterPattern, anyDigitPattern } from '../../utils/constants';

interface Props {
  [key: string]: string;
}

type TSignupRequest = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  withCredentials?: boolean;
};

export class InputButton extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: (e: Event) => {
          if ((e.target as HTMLElement)!.id === 'newPasswordButton') {
          console.log(e.target);
          const input1 = document.getElementById('newPassword') as HTMLInputElement;
          const input2 = document.getElementById('oldPassword') as HTMLInputElement;
          e.preventDefault();
          console.log('input-button');
          validateProfilePassword(e, input1);
          validateProfilePassword(e, input2);
          const res = {
            oldPassword: input2.value,
            newPassword: input1.value,
          };
          console.log(res);
          return new HTTPTransport()
            .put('https://ya-praktikum.tech/api/v2/user/password', {
              credentials: 'include',
              mode: 'cors',
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
              data: res
            })
            .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              if (typeof rawResponse === 'string') {
                console.log(JSON.parse(rawResponse));
                return JSON.parse(rawResponse);
              }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const response1 = JSON.parse(rawResponse) as any;
              console.log(response1);
              return response1;
            })
           }
        if ((e.target as HTMLElement)!.id === 'avatarButton')  {
          e.preventDefault();
          const avatar = document.getElementById('avatar') as HTMLInputElement;
          const form = document.querySelector('.fileinput-profile-field__input-raw');
          const formdata = new FormData(form as HTMLFormElement);


          const input = (<HTMLInputElement>document.querySelector('input[type="file"]'));
          if (input !== null && input instanceof HTMLInputElement && input.files) {
            console.log ('file');
            console.log()
            formdata.append('file', input.files[0]);
          }
          return new HTTPTransport()
            .put('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
              credentials: 'include',
              mode: 'cors',
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: formdata
            })
            .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              if (typeof rawResponse === 'string') {
                console.log(JSON.parse(rawResponse));
                return JSON.parse(rawResponse);
              }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const response1 = JSON.parse(rawResponse) as any;
              console.log(response1);
              return response1;
            })
          }
        }
        }          
        })
  }
  render() {
    return InputButtonRaw;
  }
}
