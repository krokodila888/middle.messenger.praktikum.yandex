import store from '../tools/Store';
import { TErrorMessage, TUpdateUserResponce } from '../types/types';
import HTTPTransport from '../utils/api';
import { BASE_URL } from '../utils/constants';
import { BaseAPI } from './baze-api';

const api = new HTTPTransport();

export default class SetAvatarAPI extends BaseAPI {
  request(formdata: FormData) {
    return api
    .put(`${BASE_URL}/user/profile/avatar`, {
      data: formdata,
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
          type: 'SET_AVATAR_ERROR',
          error: response
        });
      } else {
        store.dispatch({
          type: 'SET_USER',
          user: response
        });
      }
    })
  }
}
