import HTTPTransport from '../utils/api';
import { BaseAPI } from './baze-api';

const chatMessagesAPIInstance = new HTTPTransport();

/*class ChatMessagesAPI extends BaseAPI {
  request({id}) {
    return chatMessagesAPIInstance.get(`/${id}`);
  }
}*/