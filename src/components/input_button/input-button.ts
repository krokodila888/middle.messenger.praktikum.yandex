import './input-button.scss';
import Block from '../../tools/Block';
import InputButtonRaw from './input-button.hbs?raw';
import { validateProfileItem } from '../../utils/validation';
import { RegisterAPI } from '../../api/auth-api';
import HTTPTransport, { TOptions } from '../../utils/api';
import store from '../../tools/Store';
import Router from '../../tools/Router';
import cloneDeep from '../../utils/clone-deep';

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
        click: (e: SubmitEvent) => {
          e.preventDefault();
          /*const input1 = document.getElementsByName(props.name);
          let isValid;
          if (input1[0].name === 'newPassword') {
            isValid = (i.value === '' || (i.validity.valid && anyBigLetterPattern.test(i.value) && anyDigitPattern.test(i.value)))
          };

          const inputs = document.querySelectorAll('input');
          type MyType = {
            [key: string]: string;
          };
          const res: MyType = {};
          inputs.forEach((item) => {
            res[item.name] = item.value;
          });

          if (document.querySelector(`.button__profile`)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const aaa: HTMLInputElement[] = [];
            inputs.forEach((item) => {
              if (item.name !=="newPassword" && item.name !== 'avatar' && item.name !== 'search' && item.name !== 'message' && item.name !== 'password') {
                aaa.push(item)
              }
            })
            console.log(aaa);
            aaa.forEach((item) => {
              validateProfileItem(item);
            });
            const res1: MyType = {};
            aaa.forEach((item) => {
              res1[item.name] = item.value;
            });
            res1.display_name = `${res1.first_name} ${res1.second_name}`;
            /*res1.id = storeData.user.id;
            res1.avatar = '';*/
            /*console.log(res1);
            return new HTTPTransport()
            .post('https://ya-praktikum.tech/api/v2/user/profile', {
              credentials: 'include',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
              },
              data: res1
            })
            .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              if (typeof rawResponse === 'string') {
                return rawResponse;
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const response = JSON.parse(rawResponse) as any;
              return response;
            })
            .then((response) => {
              if (response === "OK") {
                return new HTTPTransport()
              .get('https://ya-praktikum.tech/api/v2/auth/user', {
                credentials: 'include',
                mode: 'cors',
                withCredentials: true
              })
              .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                if (typeof rawResponse === 'string') {
                  console.log(rawResponse);
                  return JSON.parse(rawResponse);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const response1 = JSON.parse(rawResponse) as any;
                console.log(response1);
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
          }})}
      },*/
  }}});
  }
  render() {
    return InputButtonRaw;
  }
}
