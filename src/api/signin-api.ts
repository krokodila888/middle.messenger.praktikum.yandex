import { chatController } from '../controllers/chats-controller';
import Router from '../tools/Router';
import store from '../tools/Store';
import { TSigninRequest, TSigninResponse, TUserDataResponce, TChatInfo, TErrorMessage, TChatInfo2, TOtherUserType } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const signinAPIInstance = new HTTPTransport();
const getuserAPIInstance = new HTTPTransport();
const getchatsAPIInstance = new HTTPTransport();
const getUsersAPIInstance = new HTTPTransport();

export default class SigninAPI extends BaseAPI {
  request(user: TSigninRequest) {
    return signinAPIInstance
    .post('https://ya-praktikum.tech/api/v2/auth/signin', {
      data: user,
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((xhr) => {
      const rawResponse = (xhr as XMLHttpRequest).responseText;
      if (typeof rawResponse === 'string') {
        return rawResponse;
      }
      const response = JSON.parse(rawResponse) as TSigninResponse;
      return response;
    })
    .then((response) => {
      if (response !== 'OK') {
        store.dispatch({
          type: 'SET_LOGIN_ERROR',
          error: JSON.parse(response as string) as TSigninResponse
        })
        return
      }
      if (response === 'OK') {
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
            })
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
                console.log(store.getState());
                const chatsWithUsers = (response as TChatInfo2[]).map((item) => {
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
                const router = new Router("app");
                router.go("/messenger")
              }
            })
          }
        })
      }
      return
    })
  }
}
