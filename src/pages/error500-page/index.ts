import './error-page.scss';
import Block from '../../tools/Block';
import { Logo, Title, ErrorField, Link } from '../../components';
import Error500PageRaw from './error500-page.hbs?raw';
export class Error500Page extends Block {
  constructor() {
    super({
      title: new Title({ title: "Common ", span: "chat" }),
      errorfield: new ErrorField({ text: "Error 500" }), 
      link1: new Link({ text: "Something went wrong. Sorry(" }),
      link2: new Link({ page: "back", link: "Go back and try again" }),
      logo: new Logo({ }),
    });
  }

  render() {
    return Error500PageRaw;
  }
}
