import './login-page.scss';
import Block from '../../tools/Block';
import { PageTitle, Input, Button, Link } from '../../components';
import LoginPageRaw from './login-page.hbs?raw';

export class LoginPage extends Block {
  constructor() {
    super('div', {
      pagetitle: new PageTitle({
        title: "Common ", 
        span: "chat",
      }),
      logininput: new Input({
        className: "login-page__input",
        placeholder: "Login",
        name: "login",
      }),
      passwordinput: new Input({
        className: "login-page__input", 
        placeholder: "Password",
        name: "password",
        type: "password",
      }),
      button: new Button({
        text: "Enter", 
        page: "chat",
        next: "next",
      }),
      linktoregister: new Link({
        page: "register", 
        text: "Not registered? ",
        link: "Create a profile",
      }),
      link1: new Link({ 
        page: "error404",
        text: "Ошибок быть не может, но вдруг: ",
        link: "Ошибка 404",
      }),
      link2: new Link({ 
        page: "error500", 
        text: "И вот еще ", 
        link: "Ошибка 5**", 
      }),
      link3: new Link({ 
        page: "profile", 
        text: "To Profile: ", 
        link: "Profile", 
      }),
    });
  }

  override render() {
    return LoginPageRaw;
  }
}
