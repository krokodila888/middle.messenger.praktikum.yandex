import * as Pages from './pages';
import Block from './tools/Block';

const pages: { [key: string]: [typeof Block] } = {
  'chat': [ Pages.ChatPage ],
  'login': [ Pages.LoginPage ],
  'register': [ Pages.RegisterPage ],
  'error404': [ Pages.Error404Page ],
  'error500': [ Pages.Error500Page ],
  'profile': [ Pages.ProfilePage ],
};

function navigate(page: string): void {
  const [NewPage] = pages[page];
  const block = new NewPage("main", {});
  const container = document.getElementById('app');
  container!.replaceChildren(block.getContent()!);
}

//у других типов Property 'navigate' does not exist on type 
window.navigate = navigate;

const block = new Pages.LoginPage();
const container = document.getElementById('app')!;

container.append(block.getContent()!);

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
  if (e && e.target) {
  const target = e.target as HTMLElement;
  const page = target.getAttribute('page');
    if (page) {
      navigate(page);
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
});
