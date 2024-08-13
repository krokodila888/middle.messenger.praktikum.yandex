import store from '../tools/Store';
import {TUserChatData, TUserDataResponce, TErrorMessage, TSearchUserResponse } from '../types/types';
import HTTPTransport from '../utils/api';
import { BASE_URL } from '../utils/constants';
import { BaseAPI } from './baze-api';

const api = new HTTPTransport();

export default class AddUserAPI extends BaseAPI {
  request(data: TUserChatData) {
    return api
    .post(`${BASE_URL}/user/search`, {
      data: {login: data.login},
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((xhr) => {
      const rawResponse = (xhr as XMLHttpRequest).responseText;
      const response = JSON.parse(rawResponse) as TSearchUserResponse;
      return response;
    })
    .then((response) => {
      if (response[0].reason) {
        store.dispatch({
          type: 'SEARCH_USER_ERROR',
          error: response
        });
        return
      }
      else {
        const aaa = response[0];
        return api
        .put(`${BASE_URL}/chats/users`, {
          credentials: 'include',
          mode: 'cors',
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
          data: { users: [
            aaa.id
            ],
            chatId: data.chatid
          }
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
          if (response === 'OK') {
            return api
            .get(`${BASE_URL}/chats/${data.chatid}/users`, {
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
                  type: 'GET_USERS_ERROR',
                  error: response
                });
                return
              }
              else {
                store.dispatch({
                  type: 'SET_USERS',
                  users: response,
                  id: data.chatid,
                });
                return
              }})
            }
            return
          })
        }
      })
  }
}
