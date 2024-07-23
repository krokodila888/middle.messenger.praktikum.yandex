import * as Pages from './pages';
import Router from './tools/Router';
import { connect } from './tools/Hoc';
import Block from './tools/Block';
import store from './tools/Store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Indexed<T = any> = {
  [key in string]: T;
};

const connectedChatPage = connect(Pages.ChatPage);
const connectedLoginPage = connect(Pages.LoginPage);
const connectedRegisterPage = connect(Pages.RegisterPage);
const connectedProfilePage = connect(Pages.ProfilePage) as unknown as typeof Block;
const connectedError404Page = connect(Pages.Error404Page);
const connectedError500Page = connect(Pages.Error500Page);

const router = new Router("app");  
router
  .use("/", connectedLoginPage)
  .use("/sign-up", connectedRegisterPage)
  .use("/settings", connectedProfilePage)
  .use("/messenger", connectedChatPage)
  .use("/error404", connectedError404Page)
  .use("/error500", connectedError500Page)
  .start()
