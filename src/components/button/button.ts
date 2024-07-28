import './button.scss';
import Block from '../../tools/Block';
import ButtonRaw from './button.hbs?raw';
import { validateItem, validateProfileItem } from '../../utils/validation';
import HTTPTransport, { TOptions } from '../../utils/api';
import store from '../../tools/Store';
import Router from '../../tools/Router';
import SigninAPI from '../../api/signin-api'
import { TSigninRequest, TUserRequest } from '../../types/types';
import SignupAPI from '../../api/signup-api';

interface Props {
  [key: string]: string;
}

type MyType = {
  [key: string]: string;
};

type TSignupRequest = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  withCredentials?: boolean;
};

export class Button extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: (e: SubmitEvent) => {
          e.preventDefault();

          if (document.querySelector(`.button__profile`)) {
            console.log(`.button__profile`);
            const inputs = document.querySelectorAll('input');
            const res: MyType = {};
            inputs.forEach((item) => {
              res[item.name] = item.value;
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const aaa: HTMLInputElement[] = [];
            inputs.forEach((item) => {
              if (item.name !=="newPassword" && item.name !== 'avatar' && item.name !== 'search' && item.name !== 'message' && item.name !== 'password') {
                aaa.push(item)
              }
            });
            aaa.forEach((item) => {
              validateProfileItem(item);
            });
            const res1: MyType = {};
            aaa.forEach((item) => {
              res1[item.name] = item.value;
            });
            res1.display_name = `${res1.first_name} ${res1.second_name}`;
            console.log(res1);
            return new HTTPTransport()
            .put('https://ya-praktikum.tech/api/v2/user/profile', {
              credentials: 'include',
              mode: 'cors',
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
              data: res1
              
            })
            .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              if (typeof rawResponse === 'string') {
                console.log(JSON.parse(rawResponse));
                return JSON.parse(rawResponse);
              }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const response1 = JSON.parse(rawResponse) as any;
              return response1;
            })
              .then((resss) => {
                if (resss) {
                  store.dispatch({
                    type: 'SET_USER',
                    user: resss
                  });
                  console.log(store.getState());
                }
              })
           }

          if (document.querySelector(`.button__login`)) {
            console.log(`.button__login`);
            const inputs = document.querySelectorAll('input');
            console.log(inputs);
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
            console.log(`.button__register`);
            const inputs = document.querySelectorAll('input');
            console.log(inputs);
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
