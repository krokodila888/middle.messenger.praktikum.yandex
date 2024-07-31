/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Pages from './pages';
import Router from './tools/Router';
import { connect } from './tools/Hoc';
import Block from './tools/Block';
import GetUserAPI from './api/get-user-api';
import { ChatItem } from './components';
import { TChatInfo } from './types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectedChatPage = connect(Pages.ChatPage, (st: any) => {
  console.log('selector', st);
  if (st.user.first_name !== '' && st.chats !== null) {
    console.log('update in chats')
    return {
      avatar: st.user.avatar,
      id1: st.chats[0].id,
      title1: st.chats[0].title,
      currentid: st.currentChat.id as string | null,
      currenttitle: st.currentChat.title,
      currentavatar: st.currentChat.avatar,
    }
  }
}) as unknown as typeof Block;
//errormessage

const connectedLoginPage = connect(Pages.LoginPage, (st: any) => {
  console.log('selector', st);
  if (st.loginError !== null && st.loginError.reason) {
    console.log('update in login');
    return {
      errormessage: st.loginError.reason,
      errorclass: 'login-page__span_valid'
    }
  }
}) as unknown as typeof Block;

const connectedRegisterPage = connect(Pages.RegisterPage, (st: any) => {
  console.log('selector', st);
  if (st.registerError !== null && st.registerError.reason) {
    console.log('update in register');
    return {
      errormessage: st.registerError.reason,
      errorclass: 'register-page__span_valid'
    }
  }
}) as unknown as typeof Block;

const connectedProfilePage = connect(Pages.ProfilePage, (st: any) => {
  console.log('selector', st);
  if (st.user.first_name !== '') {
    console.log('update in profile')
    return {
      firstname: st.user.first_name,
      secondname: st.user.second_name,
      phone: st.user.phone,
      login: st.user.login,
      email: st.user.email,
      avatar: st.user.avatar,
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
const getuserapi = new GetUserAPI;
getuserapi.request();

