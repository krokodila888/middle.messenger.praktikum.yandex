import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';
import Router from '../tools/Router';
import store from '../tools/Store';
import { TChatInfo, TSignupResponse, TErrorMessage, TCreareChatRequest } from '../types/types';
import { chatController } from '../controllers/chats-controller';

const createChatAPIInstance = new HTTPTransport();
const getchatsAPIInstance1 = new HTTPTransport();

export default class CreareChatAPI extends BaseAPI {
  request(title: TCreareChatRequest) {
    let newchatid: number = 0;
    return createChatAPIInstance
    .post('https://ya-praktikum.tech/api/v2/chats', {
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
      }
      if (response.id) {
        newchatid = response.id;
        return getchatsAPIInstance1
        .get('https://ya-praktikum.tech/api/v2/chats', {
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
            const router = new Router("app");
            router.go("/messenger");
          }
          if (newchatid !== 0) {
            console.log(newchatid);
            chatController.createConnection({id: Number(newchatid)});
          }
        })
      }
    }
  )}
}
