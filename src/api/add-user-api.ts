/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from '../tools/Router';
import store from '../tools/Store';
import {TUserChatData, TUserDataResponce, TChatInfo, TErrorMessage, TSearchUserResponse } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const searchUserAPIInstance = new HTTPTransport();
const addUserAPIInstance = new HTTPTransport();

export default class AddUserAPI extends BaseAPI {
  request(data: TUserChatData) {
    return searchUserAPIInstance
    .post('https://ya-praktikum.tech/api/v2/user/search', {
      data: {login: data.login},
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
          .then((xhr) => {
            const rawResponse = (xhr as XMLHttpRequest).responseText;
            const response = JSON.parse(rawResponse) as TSearchUserResponse;
            return response;
          })
          .then((response) => {
            if (response[0].reason) {
              store.dispatch({
                type: 'SEARCH_USER_ERROR',
                error: response
              });
            }
            else {
              const aaa = response[0];
              /*store.dispatch({
                type: 'SET_USER',
                user: response
              });
              console.log(store.getState());*/
              return addUserAPIInstance
              .put('https://ya-praktikum.tech/api/v2/chats/users', {
                credentials: 'include',
                mode: 'cors',
                withCredentials: true,
                data: { users: [
                  aaa.id
                  ],
                  chatId: data.chatid
                }
              })
              .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                if (typeof rawResponse === 'string') {
                  return rawResponse;
                }
                const response = JSON.parse(rawResponse) as TErrorMessage;
                return response;
              })
              .then((response) => {
                if (response !== 'OK') {
                  store.dispatch({
                    type: 'SET_LOGIN_ERROR',
                    error: JSON.parse(response as string) as TErrorMessage
                  })
                }
              })
              /*.then((response) => {
                if ((response as TErrorMessage).reason ) {
                  store.dispatch({
                    type: 'SET_CHATS_ERROR',
                    error: response
                  });
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
        }*/
      }
      }
)}}
