import store from '../tools/Store';
import { TErrorMessage, TEditPasswordRequest } from '../types/types';
import HTTPTransport from '../utils/api';
import { BASE_URL } from '../utils/constants';
import { BaseAPI } from './baze-api';

const api = new HTTPTransport();

export default class ChangePasswordAPI extends BaseAPI {
  request(user: TEditPasswordRequest) {
    return api
    .put(`${BASE_URL}/user/password`, {
      data: user,
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
          type: 'EDIT_PASSWORD_ERROR',
          error: response as TErrorMessage
        })
      }
    })
  }
}
