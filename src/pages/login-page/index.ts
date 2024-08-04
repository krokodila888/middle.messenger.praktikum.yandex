import './login-page.scss';
import Block, { IProps } from '../../tools/Block';
import { PageTitle, Button, Link, InputField } from '../../components';
import LoginPageRaw from './login-page.hbs?raw';
export class LoginPage extends Block {
  constructor() {
    super({
      pagetitle: new PageTitle({
        title: "Common ", 
        span: "chat",
      }),
      logininputfield: new InputField({
        className: "login-page__input",
        placeholder: "Login",
        name: "login",
        required: "true",
        min: "3",
        max: "20",
        autocomplete: "true",
        spanclass: "span_login",
        spanid: "span_login",
        errormessage: "От 3 до 20 символов (латиница, допустимы цифры, дефис и нижнее подчёркивание)",
      }),
      passwordinputfield: new InputField({
        className: "login-page__input", 
        placeholder: "Password",
        name: "password",
        type: "password",
        required: "true",
        min: "8",
        max: "40",
        autocomplete: "true",
        spanclass: "span_password",
        spanid: "span_password",
        errormessage: "От 8 до 40 символов (обязательна хотя бы одна заглавная буква и цифра)",
      }),
      button: new Button({
        text: "Enter", 
        page: "chat",
        next: "next",
        className: "button__login button__disabled",
      }),
      linktoregister: new Link({
        page: "register", 
        text: "Not registered? ",
        link: "Create a profile",
      }),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(/*oldProps: IProps, newProps: IProps*/): boolean {
    return true;
  }

  render() {
    return LoginPageRaw;
  }
}
