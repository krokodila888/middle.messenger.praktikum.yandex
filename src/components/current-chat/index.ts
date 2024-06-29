import Handlebars from 'handlebars';
import './current-chat.scss';
export { default as CurrentChat } from './current-chat.hbs?raw';

Handlebars.registerHelper('messages', () => {
  return [
    {
      time: "06:20",
      date: "10.06.2024",
      toMe: false,
      text: "Посмотри правки, они на почте",
    },
    {
      time: "06:26",
      date: "10.06.2024",
      toMe: false,
      text: "????",
    },
    {
      time: "06:28",
      date: "10.06.2024",
      toMe: false,
      text: "Значит, премия тебе не нужна",
    },
    {
      time: "10:42",
      date: "10.06.2024",
      toMe: true,
      text: "Я у вас уже втрой день не работаю!!",
    },
    {
      time: "10:43",
      date: "10.06.2024",
      toMe: true,
      text: "Вот поэтому",
    },
  ]
});
