/* eslint-disable @typescript-eslint/no-explicit-any */
import store from '../tools/Store';
import { WSTransport } from '../tools/Websocket';
import { TErrorMessage, TEditPasswordRequest, TTokenResponce } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const openChatAPIInstance = new HTTPTransport();

export default class OpenChatAPI extends BaseAPI {
  request(data: {id: number, userid: number}) {
    console.log('socket')
    return openChatAPIInstance
    .post(`https://ya-praktikum.tech/api/v2/chats/token/${data.id}`, {
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((xhr) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        /*if (typeof rawResponse === 'string') {
          return rawResponse;
        }*/
        const response = JSON.parse(rawResponse) as TTokenResponce;
        return response;
      })
      .then((response) => {
        const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${data.userid}/${data.id}/${response}`);
        socket.connect()
      })
      }
    }

