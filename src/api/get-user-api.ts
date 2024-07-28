/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from '../tools/Router';
import store from '../tools/Store';
import { TUserDataResponce, TChatInfo, TErrorMessage } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const getuserAPIInstance = new HTTPTransport();
const getchatsAPIInstance = new HTTPTransport();

export default class GetUserAPI extends BaseAPI {
  request() {
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
            if (response.reason) {
              store.dispatch({
                type: 'SET_USER_ERROR',
                error: response
              });
              const router = new Router("app");
              if (window.location.pathname === '/settings' || window.location.pathname === '/messenger') {
                router.go("/")
              }
            }
            else {
              store.dispatch({
                type: 'SET_USER',
                user: response
              });
              console.log(store.getState());
              return getchatsAPIInstance
              .get('https://ya-praktikum.tech/api/v2/chats', {
                credentials: 'include',
                mode: 'cors',
                withCredentials: true
              })
              .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                const response = JSON.parse(rawResponse) as (TChatInfo[] | [] | TErrorMessage);
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
                }
              })
              .then(() => {
                console.log(window.location);
                const router = new Router("app");
                if (window.location.pathname === '/' || window.location.pathname === '/sign-up') {
                  router.go("/messenger");
                }
              })
        }
      }
      )}
}
