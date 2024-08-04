import store from '../tools/Store';
import { TChangeChatAvatarRequest, TChatInfo, TErrorMessage, TUpdateUserResponce } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const setChatAvatarAPIInstance = new HTTPTransport();
const getchatsAPIInstance = new HTTPTransport();

export default class SetChatAvatarAPI extends BaseAPI {
  request(data: /*TChangeChatAvatarRequest*/FormData) {
    return setChatAvatarAPIInstance
    .put('https://ya-praktikum.tech/api/v2/chats/avatar', {
      data: data,
      credentials: 'include',
      mode: 'cors',
      withCredentials: true,
    })
    .then((xhr) => {
      const rawResponse = (xhr as XMLHttpRequest).responseText;
      const response = JSON.parse(rawResponse) as TUpdateUserResponce | TErrorMessage;
      return response;
    })
    .then((response) => {
      if ((response as TErrorMessage).reason ) {
        store.dispatch({
          type: 'SET_CHAT_AVATAR_ERROR',
          error: response
        });
      } else {
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
              type: 'SET_CHAT_AVATAR_ERROR',
              error: response
            });
          } else {
            const dataId = data.get('chatId');
            if (dataId) {
            store.dispatch({
              type: 'SET_CHAT_AVATAR',
              chats: response,
              chatId: data.get('chatId'),
            });
          }
          }
          return response
        })
        
      }
    })
  }
}
