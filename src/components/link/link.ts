import './link.scss';
import Block from '../../tools/Block';
import LinkRaw from './link.hbs?raw';
import Router from '../../tools/Router';

interface Props {
  [key: string]: string;
}

export class Link extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: () => {
          const router = new Router("app");
          if (props.page === "register") {
            router.go("/sign-up")
          };
          if (props.page === "login") {
            router.go("/")
          };
          if (props.page === "profile") {
            router.go("/settings")
          };
          if (props.page === "error500") {
            router.go("/error500")
          };
          if (props.page === "error404") {
            router.go("/error404")
          };
          if (props.page === "chat") {
            router.go("/messenger")
          };
        },
      },
    });
  }
  render() {
    return LinkRaw;
  }
}
