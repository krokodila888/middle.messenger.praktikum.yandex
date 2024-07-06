import './profile-page.scss';
import Block from '../../tools/Block';
import { Logo, ChatIcon, Title, Avatar, InputProfileField, Button, ExitButton, Link } from '../../components';
import ProfilePageRaw from './profile-page.hbs?raw';

export class ProfilePage extends Block {
  constructor() {
    super({
      logo: new Logo({ }),
      chatlink: new Link({ page: "chat", link: "Your chats", className: "link__link_medium" }),
      chaticon: new ChatIcon({ }),
      generaltitle: new Title({
        title: "Common ",
        span: "chat",
      }),
      title: new Title({
        title: "Your ",
        span: "profile",
      }),
      avatar: new Avatar({}),
      firstnameinput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "First name", 
        value: "Ann", 
        name: "first_name",
        title: "Name:",
        required: "true",
        errormessage: "Латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис",
        spanclass: "span_profile_first_name",
        spanid: "span_profile_first_name",
      }),
      lastnameinput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "Second name",
        value: "Doe",
        name: "second_name",
        title: "Surname:",
        required: "true",
        errormessage: "Латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис",
        spanclass: "span_profile_second_name",
        spanid: "span_profile_second_name",
      }),
      logininput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "Login",
        value: "Ann8888",
        name: "login",
        title: "Login:",
        required: "true",
        min: "3",
        max: "20",
        errormessage: "От 3 до 20 символов (латиница, допустимы цифры, дефис и нижнее подчёркивание)",
        spanclass: "span_profile_login",
        spanid: "span_profile_login",
      }),
      emailinput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "Email",
        value: "ann888@ya.ru", 
        name: "email",
        title: "Email:",
        required: "true",
        type: "email",
        errormessage: "Проверьте написание адреса электронной почты",
        spanclass: "span_profile_email",
        spanid: "span_profile_email",
      }),
      phoneinput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "Phone number",
        name: "phone",
        value: "+79000000000",
        title: "Phone:",
        required: "true",
        min: "10",
        max: "15",
        errormessage: "От 10 до 15 символов (только цифры, может начинаться с плюса)",
        spanclass: "span_profile_phone",
        spanid: "span_profile_phone",
      }),
      avatarInput: new InputProfileField({
        className: "profile-page__input", 
        placeholder: "Avatar", 
        name: "avatar",
        value: "https//some-link.png",
        title: "Avatar:",
        disabled: "disabled",
        readonly: "readonly",
      }),
      passwordinput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "Password",
        name: "oldPassword",
        value: "777777777777Aaaaa",
        type: "password",
        title: "Password:",
        disabled: "disabled",
        readonly: "readonly",
      }),
      newpasswordinput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "New password",
        name: "newPassword",
        type: "password",
        title: "New password:",
        min: "8",
        max: "40",
        autocomplete: "new-password",
        errormessage: "От 8 до 40 символов (обязательна хотя бы одна заглавная буква и цифра)",
        spanclass: "span_profile_newPassword",
        spanid: "span_profile_newPassword",
      }),
      button: new Button({
        text: "Save changes",
        next: "next",
        className: "button__profile",
      }),
      exitbutton: new ExitButton({}),
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



  render() {
    return ProfilePageRaw;
  }
}
