import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';
import Router from '../tools/Router';
import store from '../tools/Store';
import { TChatInfo, TSignupResponse, TErrorMessage, TCreareChatRequest, TChatInfo2, TOtherUserType } from '../types/types';
import { chatController } from '../controllers/chats-controller';
import { BASE_URL } from '../utils/constants';

const api = new HTTPTransport();

export default class CreareChatAPI extends BaseAPI {
  request(title: TCreareChatRequest) {
    let newchatid: number = 0;
    return api
    .post(`${BASE_URL}/chats`, {
      data: title,
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
          type: 'CREATE_CHAT_ERROR',
          error: response,
        });
        return
      }
      if (response.id) {
        newchatid = response.id;
        return api
        .get(`${BASE_URL}/chats`, {
          credentials: 'include',
          mode: 'cors',
          withCredentials: true,
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
              error: response,
            });
            console.log(store.getState());
          } else {
            store.dispatch({
              type: 'SET_CHATS',
              chats: response,
            });
            const chats = response as unknown as TChatInfo2[];
            if (chats[0]) {
              console.log('promise');
              const chatsWithUsers = (chats as TChatInfo2[]).map((item) => {
              return api
              .get(`${BASE_URL}/chats/${item.id}/users`, {
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
                  return
                } else {
                  store.dispatch({
                    type: 'SET_USERS',
                    users: response,
                    id: item.id,
                  });
                  return
                } 
              })
            })
            Promise.all(chatsWithUsers)
            .catch(error => {
              console.error(error)
            })
            const router = new Router("app");
            router.go("/messenger");
          }
          if (newchatid !== 0) {
            console.log(newchatid);
            chatController.createConnection({id: Number(newchatid)});
          }
        }
        })
      }
      return
    }
  )}
}
