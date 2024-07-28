/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from '../tools/Router';
import store from '../tools/Store';
import { TSigninRequest, TSigninResponse, TUserDataResponce, TChatInfo, TErrorMessage } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const editSettingsAPIInstance = new HTTPTransport();

export default class SigninAPI extends BaseAPI {
  request(user: TSigninRequest) {
    return editSettingsAPIInstance
    .put('https://ya-praktikum.tech/api/v2/user/profile', {
        data: user,
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((xhr) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        if (typeof rawResponse === 'string') {
          console.log(JSON.parse(rawResponse));
          return JSON.parse(rawResponse);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response1 = JSON.parse(rawResponse) as any;
        return response1;
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
          console.log(store.getState());
        }
      })
      }
    }

