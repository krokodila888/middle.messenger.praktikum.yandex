/* eslint-disable @typescript-eslint/no-explicit-any */
import store from '../tools/Store';
import { WSTransport } from '../tools/Websocket';
import { TErrorMessage, TEditPasswordRequest, TTokenResponce } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const openChatAPIInstance = new HTTPTransport();
const getUsersAPIInstance = new HTTPTransport();

export default class OpenChatAPI extends BaseAPI {
  request(data: {id: number, userid: number}) {
    return getUsersAPIInstance
      .get(`https://ya-praktikum.tech/api/v2/chats/${data.id}/users`, {
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        })
      .then((xhr) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        const response = JSON.parse(rawResponse) as TTokenResponce;
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
            id: data.id,
          });
       }
      })
      .then(() => {
      const id = `${data.id}`
      return openChatAPIInstance
      .post(`https://ya-praktikum.tech/api/v2/chats/token/${id}`, {
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((xhr) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        const response = JSON.parse(rawResponse) as TTokenResponce;
        return response;
      })
      .then((response) => {
        const id = `${data.id}`;
        const userid = `${data.userid}`;
        const token = response.token;
        const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userid}/${id}/${token}`);
        socket.connect()
      })
    })
  }
}
