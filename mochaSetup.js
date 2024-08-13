import {JSDOM} from 'jsdom';

const jsdom = new JSDOM('<body></body>');

/*const jsdom1 = new JSDOM(input: '<body></body>', options:{
    url: 'https://example.org/'
});*/

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.FormData - json.window.FormData;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
