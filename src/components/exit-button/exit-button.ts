import './exit-button.scss';
import ExitButtonRaw from './exit-button.hbs?raw';
import Block from '../../tools/Block';
import { Link } from '../../components';
import LogoutAPI from '../../api/signout-api';

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
          const logoutapi = new LogoutAPI;
          logoutapi.request()
        }
    }});
  }
  render() {
    return ExitButtonRaw;
  }
}
