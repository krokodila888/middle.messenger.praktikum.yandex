import './button.scss';
import Block from '../../tools/Block';
import ButtonRaw from './button.hbs?raw';
import { validateItem, validateProfileItem } from '../../utils/validation';
import SigninAPI from '../../api/signin-api'
import { TEditUserRequest, TSigninRequest, TUserRequest } from '../../types/types';
import SignupAPI from '../../api/signup-api';
import EditSettingsAPI from '../../api/edit-profile-api';

interface Props {
  [key: string]: string;
}

type MyType = {
  [key: string]: string;
};

export class Button extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: (e: SubmitEvent) => {
          e.preventDefault();
          if (document.querySelector(`.button__profile`)) {
            //console.log(`.button__profile`);
            const inputs = document.querySelectorAll('input');
            const res: MyType = {};
            inputs.forEach((item) => {
              res[item.name] = item.value;
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const copy: HTMLInputElement[] = [];
            inputs.forEach((item) => {
              if (item.name !=="newPassword" && item.name !== 'avatar' && item.name !== 'search' && item.name !== 'message' && item.name !== 'password') {
                copy.push(item)
              }
            });
            copy.forEach((item) => {
              validateProfileItem(item);
            });
            const res1: MyType = {};
            copy.forEach((item) => {
              res1[item.name] = item.value;
            });
            res1.display_name = `${res1.first_name} ${res1.second_name}`;
            const editsettingsApi = new EditSettingsAPI;
            editsettingsApi.request(res1 as TEditUserRequest);
           }

          if (document.querySelector(`.button__login`)) {
            const inputs = document.querySelectorAll('input');
            const res: MyType = {};
            inputs.forEach((item) => {
              res[item.name] = item.value;
            });
            inputs.forEach((item) => {
              validateItem(item);
            });
            const signinapi = new SigninAPI;
            signinapi.request(res as TSigninRequest);
          };

          if (document.querySelector(`.button__register`)) {
            const inputs = document.querySelectorAll('input');
            const res: MyType = {};
            inputs.forEach((item) => {
              res[item.name] = item.value;
            });
            inputs.forEach((item) => {
              validateItem(item);
            });
            const signupapi = new SignupAPI;
            signupapi.request(res as TUserRequest);
          }
        },
      },
    });
  }
  render() {
    return ButtonRaw;
  }
}
