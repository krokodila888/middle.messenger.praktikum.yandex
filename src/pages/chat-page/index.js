import Handlebars from 'handlebars';
import './chat-page.scss';
export { default as ChatPage } from './chat-page.hbs?raw';

Handlebars.registerHelper('chat-page-list', () => {
  return [
    { name: 'Boss', message: 'Проверьте почту'},
    { name: 'Those fellow', message:'Текст текст текст Текст текст текст Текст текст текст Текст текст текст Текст текст текст' },
    { name: 'Oleg', message:'Приветики! У нас есть новые правки!!!)))', avatar: "src/assets/avatar.png" },
  ]
});
