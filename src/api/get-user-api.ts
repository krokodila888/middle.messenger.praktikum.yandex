/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from '../tools/Router';
import store from '../tools/Store';
import { WSTransport } from '../tools/Websocket';
import { TUserDataResponce, TChatInfo, TErrorMessage, TChatInfo2, TTokenResponce, TOtherUserType } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const getuserAPIInstance = new HTTPTransport();
const getchatsAPIInstance = new HTTPTransport();
const getUsersAPIInstance = new HTTPTransport();
const openChatAPIInstance = new HTTPTransport();

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
                } else {
                  store.dispatch({
                    type: 'SET_CHATS',
                    chats: response
                  });
                  console.log(store.getState());
                }
                return response
              })
              .then((response) => {
                const chats = response as unknown as TChatInfo2[];
                console.log(chats);
                if (chats[0]) {
                  console.log('promise');
                  const chatsWithUsers = (chats as TChatInfo2[]).map((item) => {
                    return getUsersAPIInstance
                      .get(`https://ya-praktikum.tech/api/v2/chats/${item.id}/users`, {
                        credentials: 'include',
                        mode: 'cors',
                        headers: { 'Content-Type': 'application/json' },
                      })
                      .then((xhr) => {
                        const rawResponse = (xhr as XMLHttpRequest).responseText;
                        const response = JSON.parse(rawResponse) as TOtherUserType;
                        return response;
                      })
                      .then((response) => {
                        if ((response as unknown as TErrorMessage).reason ) {
                          store.dispatch({
                            type: 'GET_USERS_ERROR',
                            error: response
                          });
                        } else {
                          store.dispatch({
                            type: 'SET_USERS',
                            users: response,
                            id: item.id,
                          });
                        }

                        return item.id;                      
                      })
                      .then((id) => {
                          return openChatAPIInstance
                          .post(`https://ya-praktikum.tech/api/v2/chats/token/${id}`, {
                            credentials: 'include',
                            mode: 'cors',
                            headers: { 'Content-Type': 'application/json' },
                          })
                          .then((xhr) => {
                            const rawResponse = (xhr as XMLHttpRequest).responseText;
                            const response = JSON.parse(rawResponse) as TTokenResponce;
                            return response;
                          })
                          .then((response) => {
                            console.log('socket');
                            const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${store.getState().user.id}/${id}/${response}`);
                            socket.connect()
                          })
                        })
                      
                });
                Promise.all(chatsWithUsers)
                .catch(error => {
                  console.error(error)
                })
                }
              })
            }})
              .then(() => {
                console.log(window.location);
                console.log(store.getState());
                const router = new Router("app");
                if (window.location.pathname === '/' || window.location.pathname === '/sign-up') {
                  router.go("/messenger");
                }
              })
        }
      }

