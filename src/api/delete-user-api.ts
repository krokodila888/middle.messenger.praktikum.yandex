import store from '../tools/Store';
import {TDeleteUserRequest, TErrorMessage } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const searchUserAPIInstance = new HTTPTransport();

export default class DeleteUserAPI extends BaseAPI {
  request(data: TDeleteUserRequest) {
    return searchUserAPIInstance
    .delete('https://ya-praktikum.tech/api/v2/chats/users', {
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
