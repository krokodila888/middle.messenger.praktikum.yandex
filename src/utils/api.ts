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
  data?: Record<string, unknown>;
};

function queryStringify(data: Record<string, unknown> /*| null*/) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export default class HTTPTransport {
  get = (url: string, options:TOptions = {}) => {
    return this.request(url, {...options, method: METHOD.GET}, options.timeout);
  };

  post = (url: string, options:TOptions = {}) => {
    return this.request(url, {...options, method: METHOD.POST}, options.timeout);
  };

  put = (url: string, options:TOptions = {}) => {
    return this.request(url, {...options, method: METHOD.PUT}, options.timeout);
  };

  delete = (url: string, options:TOptions = {}) => { 
    return this.request(url, {...options, method: METHOD.DELETE}, options.timeout);
  };

  request = (url: string, options:TOptions = {}, timeout = 5000) => {
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
      isGet && !!data
      ? `${url}${queryStringify(data)}`
      : url,
    );

    Object.keys(headers).forEach((key: string) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.onload = function() {
      resolve(xhr);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;

    xhr.timeout = timeout;
    xhr.ontimeout = reject;

    if (isGet || !data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
  };
}
