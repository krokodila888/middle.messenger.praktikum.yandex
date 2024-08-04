import './profile-page.scss';
import Block, { IProps } from '../../tools/Block';
import { Logo, ChatIcon, Title, Avatar, InputProfileField, Button, ExitButton, Link, FileInputProfileField } from '../../components';
import ProfilePageRaw from './profile-page.hbs?raw';

export class ProfilePage extends Block {
  constructor() {
    super({
      logo: new Logo({ }),
      chatlink: new Link({ page: "chat", link: "Your chats", className: "link__link_medium" }),
      chaticon: new ChatIcon({
        chat: 'chat',
      }),
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
        value: "", 
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
        value: "",
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
        value: "",
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
        value: "", 
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
        value: "",
        title: "Phone:",
        required: "true",
        min: "10",
        max: "15",
        errormessage: "От 10 до 15 символов (только цифры, может начинаться с плюса)",
        spanclass: "span_profile_phone",
        spanid: "span_profile_phone",
      }),
      avatarInput: new FileInputProfileField({
        className: "profile-page__input", 
        placeholder: "Avatar", 
        name: "avatar",
        title: "Avatar:",
        span: 'edit',
        spanident: 'avatarButton',
      }),
      oldpasswordinput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "Old password",
        name: "oldPassword",
        type: "password",
        min: "8",
        max: "40",
        title: "Change password:",
        autocomplete: "password",
        errormessage: "От 8 до 40 символов (обязательна хотя бы одна заглавная буква и цифра)",
        spanclass: "span_profile_oldPassword",
        spanid: "span_profile_oldPassword",
      }),
      newpasswordinput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "New password",
        name: "newPassword",
        type: "password",
        title: "",
        min: "8",
        max: "40",
        autocomplete: "new-password",
        errormessage: "От 8 до 40 символов (обязательна хотя бы одна заглавная буква и цифра)",
        spanclass: "span_profile_newPassword",
        spanid: "span_profile_newPassword",
        span: 'edit',
        spanident: 'newPasswordButton',
        classNameForInput: 'input-profile-field__input-last-raw',
      }),
      button: new Button({
        text: "Save changes",
        next: "next",
        className: "button__profile",
      }),
      exitbutton: new ExitButton({}),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    console.log(newProps.avatar);
    this.children.firstnameinput.setProps({value: newProps.firstname});
    this.children.lastnameinput.setProps({value: newProps.secondname});
    this.children.logininput.setProps({value: newProps.login});
    this.children.emailinput.setProps({value: newProps.email});
    this.children.phoneinput.setProps({value: newProps.phone});
    if (newProps.avatar !== null && newProps.avatar !== '' && newProps.avatar !== undefined) {
      this.children.avatar.setProps({src: `
https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`})
    }  else {
      this.children.chaticon.setProps({src: `/assets/avatar.png`})
    }
    return true;
  }

  render() {
    return ProfilePageRaw;
  }
}
