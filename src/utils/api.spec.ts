import { expect } from "chai";
import Sinon from "sinon";
import HTTPTransport from "./api";

describe("HTTP Transport", () => {
  let request: Sinon.SinonFakeXMLHttpRequestStatic;
  let requests: Sinon.SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    request = Sinon.useFakeXMLHttpRequest();
    requests = [];

    request.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    requests = [];
  });

  describe("Options", () => {
    it('Have to send GET request', () => {
      const httpTransport = new HTTPTransport();
      httpTransport.get('/test', {});
      const [request] = requests;
      expect(request.method).to.eq('GET');
    });


    it("Have to pass headers", (done) => {
      const httpTransport = new HTTPTransport();
      const url = "/test";
      const headers = { 
        "Content-Type": "multipart/form-data;charset=utf-8" 
      };
      httpTransport.get(url, { headers }).then(() => {
        done();
      });

      const [currentRequest] = requests;
      expect(JSON.stringify(currentRequest?.requestHeaders)).to.be.eq(JSON.stringify(headers));
      currentRequest?.respond(200, headers, "");
    });
  });
});
