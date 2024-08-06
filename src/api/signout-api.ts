import store from '../tools/Store';
import { TErrorMessage } from '../types/types';
import HTTPTransport from '../utils/api';
import { BASE_URL } from '../utils/constants';
import { BaseAPI } from './baze-api';

const api = new HTTPTransport();

export default class LogoutAPI extends BaseAPI {
  request() {
    return api
    .post(`${BASE_URL}/auth/logout`)
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
