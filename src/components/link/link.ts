import './link.scss';
import Block from '../../tools/Block';
import LinkRaw from './link.hbs?raw';
import { router } from '../..';

interface Props {
  [key: string]: string;
}

export class Link extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        click: () => {
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
          if (props.page === "back") {
            router.back()
          };
        },
      },
    });
  }
  render() {
    return LinkRaw;
  }
}
