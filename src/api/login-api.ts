import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const loginAPIInstance = new HTTPTransport();

type TLoginRequest = {
  login: string;
  password: string;
};

type TLoginObjectResponse = {
  user_id?: number;
  reason?: string;
};

type TLoginResponse = string | TLoginObjectResponse;

export default class LoginAPI extends BaseAPI {
  request(user: TLoginRequest): Promise<TLoginResponse> {
    return loginAPIInstance
      .post('/auth/signin', {
        data: user,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((xhr) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        if (typeof rawResponse === 'string') {
          return rawResponse;
        }
        const response = JSON.parse(rawResponse) as TLoginResponse;
        return response;
      });
        // .post('/login', user)
        // .then(({ user_id }) => user_id);
    }
}