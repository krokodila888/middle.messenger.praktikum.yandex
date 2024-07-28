import * as Pages from './pages';
import Router from './tools/Router';
import { connect } from './tools/Hoc';
import Block from './tools/Block';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectedChatPage = connect(Pages.ChatPage, (st: any) => {
  console.log('selector', st);
  if (st.user.first_name !== '') {
    console.log('update in chats')
    return {
      avatar: st.user.avatar,
    }
  }
}) as unknown as typeof Block;


const connectedLoginPage = connect(Pages.LoginPage) as unknown as typeof Block;
const connectedRegisterPage = connect(Pages.RegisterPage) as unknown as typeof Block;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
