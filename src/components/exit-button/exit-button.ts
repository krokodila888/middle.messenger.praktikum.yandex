import './exit-button.scss';
import ExitButtonRaw from './exit-button.hbs?raw';
import Block from '../../tools/Block';
import { Link } from '../../components';
import HTTPTransport from '../../utils/api';
import Router from '../../tools/Router';

interface Props {
  [key: string]: string;
}

export class ExitButton extends Block {
  constructor(props: Props) {
    super({
      ...props,
      link: new Link({ 
        page: "login",
        link: "Log out",
        className: "link__link_medium" 
      }),
      events: {
        click: (e: SubmitEvent) => {
          e.preventDefault();
            return new HTTPTransport()
            .post('https://ya-praktikum.tech/api/v2/auth/logout'/*, {
              //credentials: 'include',
              //mode: 'cors',
            }*/)
            .then((xhr) => {
              const rawResponse = (xhr as XMLHttpRequest).responseText;
              if (typeof rawResponse === 'string') {
                return rawResponse;
              }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = JSON.parse(rawResponse) as any;
            return response;
          })
          .then((res) => {
            if (res === "OK" || res) {
              const router = new Router("app");
              router.go("/")
            }
          })

        }
    }});
  }
  render() {
    return ExitButtonRaw;
  }
}
