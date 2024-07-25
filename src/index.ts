import * as Pages from './pages';
import Router from './tools/Router';
import { connect } from './tools/Hoc';
import Block from './tools/Block';
import store from './tools/Store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Indexed<T = any> = {
  [key in string]: T;
};

const connectedChatPage = connect(Pages.ChatPage) as unknown as typeof Block;;
const connectedLoginPage = connect(Pages.LoginPage) as unknown as typeof Block;;
const connectedRegisterPage = connect(Pages.RegisterPage) as unknown as typeof Block;;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectedProfilePage = connect(Pages.ProfilePage, (st: any) => {
  console.log('selector', st);
  console.log(st.user.first_name);
  //this.firstnameinput.setProps({ title: newProps.user.first_name })
  return {title: "Title from store"}
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
