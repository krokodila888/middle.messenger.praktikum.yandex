import { chatController } from '../controllers/chats-controller';
import Router from '../tools/Router';
import store from '../tools/Store';
import { TUserDataResponce, TChatInfo, TSignupResponse, TUserRequest, TErrorMessage, TChatInfo2, TOtherUserType } from '../types/types';
import HTTPTransport from '../utils/api';
import { BASE_URL } from '../utils/constants';
import { BaseAPI } from './baze-api';

const api = new HTTPTransport();

export default class SignupAPI extends BaseAPI {
  request(user: TUserRequest) {
    return api
    .post(`${BASE_URL}/auth/signup`, {
      data: user,
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((xhr) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        const response = JSON.parse(rawResponse) as TSignupResponse;
        return response;
      })
      .then((response) => {
        if (response.reason) {
          store.dispatch({
            type: 'SET_REGISTER_ERROR',
            error: response
          });
          return
        }
        if (response.id) {
          return api
          .get(`${BASE_URL}/auth/user`, {
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
                type: 'SET_USER_ERROR',
                error: response
              })
            }
            else {
              store.dispatch({
                type: 'SET_USER',
                user: response
              });
              console.log(store.getState());
            }
            return api
            .get(`${BASE_URL}/chats`, {
              credentials: 'include',
              mode: 'cors',
              withCredentials: true
            })
            .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              const response = JSON.parse(rawResponse) as (TChatInfo[] | [] | {reason: string} );
              return response;
            })
            .then((response) => {
              if ((response as TErrorMessage).reason ) {
                store.dispatch({
                  type: 'SET_CHATS_ERROR',
                  error: response
                });
              console.log(store.getState());
            } else {
              store.dispatch({
                type: 'SET_CHATS',
                chats: response
              });
              console.log(store.getState());
              const chatsWithUsers = (response as TChatInfo2[]).map((item) => {
                return api
                .get(`${BASE_URL}/chats/${item.id}/users`, {
                  credentials: 'include',
                  mode: 'cors',
                  headers: { 'Content-Type': 'application/json' },
                })
                .then((xhr) => {
                  const rawResponse = (xhr as XMLHttpRequest).responseText;
                  const response = JSON.parse(rawResponse) as TOtherUserType;
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
                      id: item.id,
                    });
                  }                    
                })
              })
              Promise.all(chatsWithUsers)
              .catch(error => {
                console.error(error)
              })
              chatController.createConnections();
              const router = new Router("app");
              router.go("/messenger")
            }
          }
        )}
      )}
      return
    }
  )}
}
