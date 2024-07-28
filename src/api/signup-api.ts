/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from '../tools/Router';
import store from '../tools/Store';
import { TSigninRequest, TUserDataResponce, TChatInfo, TSignupResponse, TUserRequest } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const signupAPIInstance = new HTTPTransport();
const getuserAPIInstance = new HTTPTransport();
const getchatsAPIInstance = new HTTPTransport();

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
          return getuserAPIInstance
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
            if (response) {
              store.dispatch({
                type: 'SET_USER',
                user: response
              });
              console.log(store.getState());
            }
            return getchatsAPIInstance
            .get('https://ya-praktikum.tech/api/v2/chats', {
              credentials: 'include',
              mode: 'cors',
              withCredentials: true
            })
            .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              const response = JSON.parse(rawResponse) as (TChatInfo[] | []);
              return response;
            })
            .then((response) => {
              if (response) {
                store.dispatch({
                  type: 'SET_CHATS',
                  chats: response
                });
                console.log(store.getState());
              }
            })
            .then(() => {
              const router = new Router("app");
              router.go("/messenger")
            })
        }
      )}
    })
  }
}
