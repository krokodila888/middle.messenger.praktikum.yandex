import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const logoutAPIInstance = new HTTPTransport();
const getUserAPIInstance = new HTTPTransport();

export class LogoutAPI extends BaseAPI {
  request() {
    return logoutAPIInstance
      .post('/auth/logout')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((xhr: any) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        if (typeof rawResponse === 'string') {
          return rawResponse;
        }
        const response = JSON.parse(rawResponse);
        return response;
      });
        // .post('/login', user)
        // .then(({ user_id }) => user_id);
  }
}

export class GetUserAPI extends BaseAPI {
  request() {
    return getUserAPIInstance
      .get('/auth/user')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((xhr: any) => {
        const rawResponse = (xhr as XMLHttpRequest).responseText;
        if (typeof rawResponse === 'string') {
          return rawResponse;
        }
        const response = JSON.parse(rawResponse);
        console.log(response);
        return response;
      });
        // .post('/login', user)
        // .then(({ user_id }) => user_id);
  }
}