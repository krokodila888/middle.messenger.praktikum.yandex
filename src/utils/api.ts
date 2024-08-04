enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
};

export type TData = {
  status?: number;
  statusText?: string;
  [key: string]: unknown;
};

export type THeader = {
  [key: string]: string;
};

export type TOptions = {
  method?: METHOD;
  headers?: THeader;
  body?: unknown;
  mode?: "same-origin" | "no-cors" | "cors";
  credentials?: "same-origin" | "omit" | "include";
  cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
  signal?: unknown;
  timeout?: number;
  data?: Record<string, unknown> | FormData;
  withCredentials?: boolean;
};

function queryStringify(data: Record<string, unknown>): string  {
  const string = [];
  for (const [key, value] of Object.entries(data)) {
    const k = key;
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      string.push(`${k}=[object Object]`);
    } else if (Array.isArray(value)) {
      string.push(`${k}=${value!.join(',')}`);
    } else {
      string.push(`${k}=${value}`);
    }
  }
  const res = string.join('&');
  return `?${res}`;
}

export default class HTTPTransport {

  get = (url: string, options:TOptions = {}) => {
    return this.request(url, {...options, method: METHOD.GET}, options.timeout/*, options.withCredentials*/);
  };

  post = (url: string, options:TOptions = {}) => {
    return this.request(url, {...options, method: METHOD.POST}, options.timeout/*, options.withCredentials*/);
  };

  put = (url: string, options:TOptions = {}) => {
    return this.request(url, {...options, method: METHOD.PUT}, options.timeout/*, options.withCredentials*/);
  };

  delete = (url: string, options:TOptions = {}) => { 
    return this.request(url, {...options, method: METHOD.DELETE}, options.timeout/*, options.withCredentials*/);
  };

  request = (url: string, options:TOptions = {}, timeout = 5000/*, withCredentials = true*/) => {
    const {headers = {}, method, data} = options;

  return new Promise(function(resolve, reject) {
    if (!method) {
      reject('No method');
      return;
    }

    const xhr = new XMLHttpRequest();
    const isGet = method === METHOD.GET;

    xhr.open(
      method, 
      isGet && !!data && !(data instanceof FormData) 
      ? `${url}${queryStringify(data)}`
      : url,
    );

    Object.keys(headers).forEach((key: string) => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.withCredentials = true;

    xhr.onload = function() {
      resolve(xhr);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;

    xhr.timeout = timeout;
    xhr.ontimeout = reject;

    if (isGet || !data) {
      xhr.send();
    } else if (data instanceof FormData) {
      xhr.send(data as FormData) 
    } else {
      xhr.send(JSON.stringify(data));
    }
  });
  };
}

