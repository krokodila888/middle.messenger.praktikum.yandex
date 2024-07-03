import './profile-page.scss';
import Block from '../../tools/Block';
import { Logo, ChatIcon, Title, Avatar, ProfileInput, ExitButton, Link } from '../../components';
import ProfilePageRaw from './profile-page.hbs?raw';

export class ProfilePage extends Block {
  constructor() {
    super('div', {
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
      firstnameinput: new ProfileInput({
        className: "profile-page__input",
        placeholder: "First name", 
        value: "Ann", 
        name: "first_name",
        title: "Name:",
      }),
      lastnameinput: new ProfileInput({
        className: "profile-page__input",
        placeholder: "Second name",
        value: "Doe",
        name: "second_name",
        title: "Surname:",
      }),
      logininput: new ProfileInput({
        className: "profile-page__input",
        placeholder: "Login",
        value: "Ann8888",
        name: "login",
        title: "Login:",
      }),
      emailinput: new ProfileInput({
        className: "profile-page__input",
        placeholder: "Email",
        value: "ann888@ya.ru", 
        name: "email",
        title: "Email:",
      }),
      phoneinput: new ProfileInput({
        className: "profile-page__input",
        placeholder: "Phone number",
        name: "phone",
        value: "+7(900) 000-00-00",
        title: "Phone:",
      }),
      avatarInput: new ProfileInput({
        className: "profile-page__input", 
        placeholder: "Avatar", 
        name: "avatar",
        value: "https//some-link.png",
        title: "Avatar:",
      }),
      passwordinput: new ProfileInput({
        className: "profile-page__input",
        placeholder: "Password",
        name: "oldPassword",
        value: "********",
        type: "password",
        title: "Password:",
      }),
      newpasswordinput: new ProfileInput({
        className: "profile-page__input",
        placeholder: "New password",
        name: "newPassword",
        type: "password",
        title: "New password:",
      }),
      button: new ExitButton({}),
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
    return ProfilePageRaw;
  }
}
