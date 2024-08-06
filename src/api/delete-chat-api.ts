import store from '../tools/Store';
import { TChatDeleteRequest, TDeleteCharResponce } from '../types/types';
import HTTPTransport from '../utils/api';
import { BASE_URL } from '../utils/constants';
import { BaseAPI } from './baze-api';

const api = new HTTPTransport();

  export default class DeleteChatAPI extends BaseAPI {
    request(data: TChatDeleteRequest) {
      return api
      .delete(`${BASE_URL}/chats`, {
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
      }
    }
  )}
}
