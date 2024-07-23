/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const signupAPIInstance = new HTTPTransport();

const registerAPIInstance = new HTTPTransport();

type TSignupRequest = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
};

type TSignupResponse = {
    user_id?: number;
    reason?: string;
};

export default class SignupAPI extends BaseAPI {
  request(user: TSignupRequest): Promise<TSignupResponse> {
    console.log('user ' + user);
    return signupAPIInstance
      .post('https://ya-praktikum.tech/api/v2/auth/signup', {
        data: user,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((xhr) => {
        const response = JSON.parse(
          (xhr as XMLHttpRequest).responseText,
        ) as TSignupResponse;
        console.log(response);
        return response;
      });
        // .post('/login', user)
        // .then(({ user_id }) => user_id);
    }
}

export class RegisterAPI extends BaseAPI {
  request(user: TSignupRequest): Promise<any> {
    return new HTTPTransport()
      .post('/auth/signin', {
        data: user,
        headers: { 'Content-Type': 'application/json' },
      })
    .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              if (typeof rawResponse === 'string') {
                  return rawResponse;
              }
              const response = JSON.parse(rawResponse) as any;
              return response;
          });
      // .post('/login', user)
      // .then(({ user_id }) => user_id);
  }
}

/*export interface User {
  id: number;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone?: string;
  avatar?: string;
}*/
