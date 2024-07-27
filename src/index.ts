import * as Pages from './pages';
import Router from './tools/Router';
import { connect } from './tools/Hoc';
import Block from './tools/Block';
import { Avatar, InputProfileField } from './components';

const connectedChatPage = connect(Pages.ChatPage) as unknown as typeof Block;
const connectedLoginPage = connect(Pages.LoginPage) as unknown as typeof Block;
const connectedRegisterPage = connect(Pages.RegisterPage) as unknown as typeof Block;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectedProfilePage = connect(Pages.ProfilePage, (st: any) => {
  console.log('selector', st);
  console.log(st.user.first_name);
  if (st.user.first_name !== '') {
    console.log('2222')
    return {
      /*avatar: new Avatar({}),*/
      firstnameinput: new InputProfileField({
        className: "profile-page__input",
        placeholder: "First name", 
        value: st.user.first_name, 
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
        value: st.user.second_name,
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
        value: st.user.login,
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
        value: st.user.email, 
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
        value: st.user.phone,
        title: "Phone:",
        required: "true",
        min: "10",
        max: "15",
        errormessage: "От 10 до 15 символов (только цифры, может начинаться с плюса)",
        spanclass: "span_profile_phone",
        spanid: "span_profile_phone",
      }),
    }
  }
}) as unknown as typeof Block;
const connectedError404Page = connect(Pages.Error404Page);
const connectedError500Page = connect(Pages.Error500Page);

export const router = new Router("app");  
router
  .use("/", connectedLoginPage)
  .use("/sign-up", connectedRegisterPage)
  .use("/settings", connectedProfilePage)
  .use("/messenger", connectedChatPage)
  .use("/error404", connectedError404Page)
  .use("/error500", connectedError500Page)
  .start()
