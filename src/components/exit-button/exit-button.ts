import './exit-button.scss';
import ExitButtonRaw from './exit-button.hbs?raw';
import Block from '../../tools/Block';
import { Link } from '../../components';

interface Props {
  [key: string]: string;
}

export class ExitButton extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      link: new Link({ 
        page: "LoginPage",
        link: "Log out",
        className: "link__link_medium" 
      }),
    });
  }
  override render() {
    return ExitButtonRaw;
  }
}
