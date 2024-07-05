import './register-page.scss';
import Block from '../../tools/Block';
import { PageTitle, InputField, Button, Link } from '../../components';
import RegisterPageRaw from './register-page.hbs?raw';
export class RegisterPage extends Block {
  constructor() {
    super('div', {
      pagetitle: new PageTitle({
        title: "Common ", 
        span: "chat",
        logo: "src/assets/logo.png",
      }),
      firstnameinputfield: new InputField({
        className: "register-page__input", 
        placeholder: "First name", 
        name: "first_name",
        required: "true",
        errormessage: "Латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис",
        spanclass: "span_first_name",
        spanid: "span_first_name",
        
      }),
      lastnameinputfield: new InputField({
        className: "register-page__input", 
        placeholder: "Second name",
        name: "second_name",
        required: "true",
        errormessage: "Латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис",
        spanclass: "span_second_name",
        spanid: "span_second_name",
      }),
      logininputfield: new InputField({
        className: "register-page__input", 
        placeholder: "Login", 
        name: "login",
        required: "true",
        min: "3",
        max: "20",
        errormessage: "От 3 до 20 символов (латиница, допустимы цифры, дефис и нижнее подчёркивание)",
        spanclass: "span_login",
        spanid: "span_login",
      }),
      emailinputfield: new InputField({
        className: "register-page__input", 
        placeholder: "Email",
        name: "email",
        required: "true",
        type: "email",
        errormessage: "Проверьте написание адреса электронной почты",
        spanclass: "span_email",
        spanid: "span_email",
      }),
      phoneinputfield: new InputField({
        className: "register-page__input", 
        placeholder: "Phone number", 
        name: "phone",
        required: "true",
        min: "10",
        max: "15",
        errormessage: "От 10 до 15 символов (только цифры, может начинаться с плюса)",
        spanclass: "span_phone",
        spanid: "span_phone",
      }),
      passwordinputfield: new InputField({
        className: "register-page__input", 
        placeholder: "Password",
        name: "password",
        type: "password",
        required: "true",
        errormessage: "От 8 до 40 символов (обязательна хотя бы одна заглавная буква и цифра)",
        spanclass: "span_password",
        spanid: "span_password",
        min: "8",
        max: "40",
      }),
      button: new Button({
        text: "Create a profile", 
        page: "chat", 
        next: "next",
        className: "button__register button__disabled",
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
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const inputs = document.querySelectorAll('input');
          type MyType = {
            [key: string]: boolean;
          };
          const res: MyType = {};
          inputs.forEach((item) => {
            res[item.name] = item.validity.valid;
          })
          console.log(res);
        }
      },
    });
  }

  render() {
    return RegisterPageRaw;
  }
}
