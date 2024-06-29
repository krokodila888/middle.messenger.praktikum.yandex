import Handlebars from "handlebars";
import * as Components from './components';
import * as Pages from './pages';

const pages: { [key: string]: string[] } = {
  'chat': [ Pages.ChatPage ],
  'login': [ Pages.LoginPage ],
  'register': [ Pages.RegisterPage ],
  'error404': [ Pages.Error404Page ],
  'error500': [ Pages.Error500Page ],
  'profile': [ Pages.ProfilePage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  const [ source, args ] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

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
