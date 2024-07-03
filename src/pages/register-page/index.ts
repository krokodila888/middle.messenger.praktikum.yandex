import './register-page.scss';
import Block from '../../tools/Block';
import { PageTitle, Input, Button, Link } from '../../components';
import RegisterPageRaw from './register-page.hbs?raw';

export class RegisterPage extends Block {
  constructor() {
    super('div', {
      pagetitle: new PageTitle({
        title: "Common ", 
        span: "chat",
        logo: "src/assets/logo.png",
      }),
      firstnameinput: new Input({
        className: "register-page__input", 
        placeholder: "First name", 
        name: "first_name",
      }),
      lastnameinput: new Input({
        className: "register-page__input", 
        placeholder: "Second name",
        name: "second_name",
      }),
      logininput: new Input({
        className: "register-page__input", 
        placeholder: "Login", 
        name: "login",
      }),
      emailinput: new Input({
        className: "register-page__input", 
        placeholder: "Email",
        name: "email",
      }),
      phoneinput: new Input({
        className: "register-page__input", 
        placeholder: "Phone number", 
        name: "phone",
      }),
      passwordinput: new Input({
        className: "register-page__input", 
        placeholder: "Password",
        name: "password",
        type: "password",
      }),
      button: new Button({
        text: "Create a profile", 
        page: "chat", 
        next: "next",
      }),
      linktologin: new Link({
        page: "LoginPage", 
        text: "Already registered? ", 
        link: "Log in",
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
    });
  }

  override render() {
    return RegisterPageRaw;
  }
}
