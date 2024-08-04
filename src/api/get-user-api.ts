import { chatController } from '../controllers/chats-controller';
import Router from '../tools/Router';
import store from '../tools/Store';
import { TUserDataResponce, TChatInfo, TErrorMessage, TChatInfo2, TOtherUserType } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const getuserAPIInstance = new HTTPTransport();
const getchatsAPIInstance = new HTTPTransport();
const getUsersAPIInstance = new HTTPTransport();

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
        return
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
          }
          return response
          })
        .then((response) => {
          const chats = response as unknown as TChatInfo2[];
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
            })
          })
          Promise.all(chatsWithUsers)
          .catch(error => {
            console.error(error)
          })
          chatController.createConnections();
        }
      })
    }
  })
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
