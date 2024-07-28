/* eslint-disable @typescript-eslint/no-explicit-any */
import store from '../tools/Store';
import { TErrorMessage, TEditUserRequest, TUpdateUserResponce } from '../types/types';
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const editSettingsAPIInstance = new HTTPTransport();

export default class EditSettingsAPI extends BaseAPI {
  request(user: TEditUserRequest) {
    return editSettingsAPIInstance
    .put('https://ya-praktikum.tech/api/v2/user/profile', {
        data: user,
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((xhr) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        const response = JSON.parse(rawResponse) as TUpdateUserResponce | TErrorMessage;
        return response;
      })
      .then((response) => {
        if ((response as TErrorMessage).reason ) {
          store.dispatch({
            type: 'EDIT_USER_ERROR',
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

