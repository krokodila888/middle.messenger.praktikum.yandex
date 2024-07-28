/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from '../tools/Router';
import store from '../tools/Store';
import { TUserDataResponce, TChatInfo, TSignupResponse, TUserRequest, TErrorMessage } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const signupAPIInstance = new HTTPTransport();
const getuserAPIInstance1 = new HTTPTransport();
const getchatsAPIInstance1 = new HTTPTransport();

export default class SignupAPI extends BaseAPI {
  request(user: TUserRequest) {
    return signupAPIInstance
    .post('https://ya-praktikum.tech/api/v2/auth/signup', {
      data: user,
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((xhr) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        const response = JSON.parse(rawResponse) as TSignupResponse;
        return response;
      })
      .then((response) => {
        if (response.reason) {
          store.dispatch({
            type: 'SET_REGISTER_ERROR',
            error: response
          });
        }
        if (response.id) {
          return getuserAPIInstance1
          .get('https://ya-praktikum.tech/api/v2/auth/user', {
            credentials: 'include',
            mode: 'cors',
            withCredentials: true
          })
          .then((xhr) => {
            const rawResponse = (xhr as XMLHttpRequest).responseText;
            const response = JSON.parse(rawResponse) as TUserDataResponce;
            return response;
          })
          .then((response) => {
            if (response.reason) {
              store.dispatch({
                type: 'SET_USER_ERROR',
                error: response
              })
            }
            else {
              store.dispatch({
                type: 'SET_USER',
                user: response
              });
              console.log(store.getState());
            }
            return getchatsAPIInstance1
            .get('https://ya-praktikum.tech/api/v2/chats', {
              credentials: 'include',
              mode: 'cors',
              withCredentials: true
            })
            .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              const response = JSON.parse(rawResponse) as (TChatInfo[] | [] | {reason: string} );
              return response;
            })
            .then((response) => {
              if ((response as TErrorMessage).reason ) {
                store.dispatch({
                  type: 'SET_CHATS_ERROR',
                  error: response
                });
                console.log(store.getState());
              } else {
                store.dispatch({
                  type: 'SET_CHATS',
                  chats: response
                });
                console.log(store.getState());
                const router = new Router("app");
                router.go("/messenger")
        }
      }
    )
  }
      )}
      }
  )}
}
