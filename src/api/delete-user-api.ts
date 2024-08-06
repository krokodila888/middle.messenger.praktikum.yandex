import store from '../tools/Store';
import {TDeleteUserRequest, TErrorMessage } from '../types/types';
import HTTPTransport from '../utils/api';
import { BASE_URL } from '../utils/constants';
import { BaseAPI } from './baze-api';

const api = new HTTPTransport();

export default class DeleteUserAPI extends BaseAPI {
  request(data: TDeleteUserRequest) {
    return api
    .delete(`${BASE_URL}/chats/users`, {
      data: data,
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
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
        if (typeof response !== 'string') {
          store.dispatch({
            type: 'DELETE_USER_ERROR',
            error: response
          });
        }
        else {
          store.dispatch({
            type: 'DELETE_USER',
            user: data.users[0],
            chatid: data.chatId
          });
      }
    }
  )}
}
