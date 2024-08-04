import store from '../tools/Store';
import { TChatDeleteRequest, TChatInfo, TDeleteCharResponce, TErrorMessage } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const deleteChatAPIInstance = new HTTPTransport();
const getchatsAPIInstance = new HTTPTransport();

  export default class DeleteChatAPI extends BaseAPI {
    request(data: TChatDeleteRequest) {
      return deleteChatAPIInstance
      .delete('https://ya-praktikum.tech/api/v2/chats', {
          data: data,
          credentials: 'include',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
        })
        .then((xhr) => {
          const rawResponse = (xhr as XMLHttpRequest).responseText;
          const response = JSON.parse(rawResponse) as TDeleteCharResponce;
          return response
        })
        .then((response) => {
          if (response.userId) {
            store.dispatch({
              type: 'DELETE_CHAT',
              deletedChat: response.result.id
            });
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
              })}
          })}}
          