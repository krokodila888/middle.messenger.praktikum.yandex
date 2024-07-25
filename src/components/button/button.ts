import './button.scss';
import Block from '../../tools/Block';
import ButtonRaw from './button.hbs?raw';
import { validateItem, validateProfileItem } from '../../utils/validation';
import { RegisterAPI } from '../../api/auth-api';
import HTTPTransport, { TOptions } from '../../utils/api';
import store from '../../tools/Store';
import Router from '../../tools/Router';

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

export class Button extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: (e: SubmitEvent) => {
          e.preventDefault();
          const inputs = document.querySelectorAll('input');
          type MyType = {
            [key: string]: string;
          };
          const res: MyType = {};
          inputs.forEach((item) => {
            res[item.name] = item.value;
          });

          if (document.querySelector(`.button__profile`)) {
            inputs.forEach((item) => {
              validateProfileItem(item);
            });
          };
          if (document.querySelector(`.button__login`)) {
            inputs.forEach((item) => {
              validateItem(item);
            });
            return new HTTPTransport()
            .post('https://ya-praktikum.tech/api/v2/auth/signin', {
              credentials: 'include',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
              },
              data: res
            })
            .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              if (typeof rawResponse === 'string') {
                return rawResponse;
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const response = JSON.parse(rawResponse) as any;
              console.log(response);
              return response;
            })
            .then((response) => {
              console.log(response);
              if (response === "OK") {
                console.log('OK + next');
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
            .then(() => {
              const router = new Router("app");
              router.go("/messenger")
            })
            }
          })
          };
          if (document.querySelector(`.button__register`)) {
            //let aaa = false;
            inputs.forEach((item) => {
              validateItem(item);
            });
            return new HTTPTransport()
            .post('https://ya-praktikum.tech/api/v2/auth/signup', {
              credentials: 'include',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
              },
              data: res
            })
            .then((xhr) => {
              console.log((xhr as XMLHttpRequest).responseText);
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              if (typeof rawResponse === 'string') {
                console.log(rawResponse);
                return rawResponse;
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const response = JSON.parse(rawResponse) as any;

              return response;
          })
          .then((response) => {
            console.log(response);
            if (response) {
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
                console.log(resss);
                console.log(store.getState());
              }
            })
          .then(() => {
            const router = new Router("app");
            router.go("/messenger")
          })
          }
        })
          } 
          /*const options = {
            credentials: 'include',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            data: res
          };*/
          
        },
      },
    });
  }
  render() {
    return ButtonRaw;
  }
}

/*

*/