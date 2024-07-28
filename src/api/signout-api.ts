/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from '../tools/Router';
import store from '../tools/Store';
import { TErrorMessage } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const logoutAPIInstance = new HTTPTransport();

export default class LogoutAPI extends BaseAPI {
  request() {
    return logoutAPIInstance
    .post('https://ya-praktikum.tech/api/v2/auth/logout')
    .then((xhr) => {
      const rawResponse = (xhr as XMLHttpRequest).responseText;
      if (typeof rawResponse === 'string') {
        return rawResponse;
      }
      const response = JSON.parse(rawResponse) as (TErrorMessage);
      return response;
    })
    .then((response) => {
      console.log(response);
      if (response === 'OK') {
        store.dispatch({
          type: 'LOGOUT',
        })
      }
      console.log(store.getState())
    })
  }
}
