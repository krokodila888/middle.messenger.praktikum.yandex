export class BaseAPI {
  create() {
    throw new Error('Not implemented');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  request(params?: Record<string, any> | string): Promise<unknown> {
    throw new Error('Not implemented');
  }
  update() {
    throw new Error('Not implemented');
  }
  delete() {
    throw new Error('Not implemented');
  }
}
