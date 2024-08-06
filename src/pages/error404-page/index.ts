import './error-page.scss';
import Block from '../../tools/Block';
import { Logo, Title, ErrorField, Link } from '../../components';
import Error404PageRaw from './error404-page.hbs?raw';

export class Error404Page extends Block {
  constructor() {
    super({
      title: new Title({ title: "Common ", span: "chat" }),
      errorfield: new ErrorField({ text: "Error 404" }), 
      link1: new Link({ text: "No such page. Sorry(" }),
      link2: new Link({ page: "back", link: "Go back and try again" }),
      logo: new Logo({ }),
    });
  }

  render() {
    return Error404PageRaw;
  }
}
