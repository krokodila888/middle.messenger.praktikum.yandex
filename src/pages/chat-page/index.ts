import './chat-page.scss';
import Block from '../../tools/Block';
import { Logo, Title, ChatItem, Link, ChatIcon, SearchInput, InterlocutorItem, MessageItem, MessageInput } from '../../components';
import ChatPageRaw from './chat-page.hbs?raw';
export class ChatPage extends Block {
  constructor() {
    super({
      logo: new Logo({ }),
      generaltitle: new Title({ title: "Common ", span: "chat" }),
      profilelink: new Link({ page: "profile", link: "Your profile", className: "link__link_medium" }),
      searchinput: new SearchInput({
        name: "search",
      }),
      chaticon: new ChatIcon({ }),
      linktologin: new Link({
        page: "LoginPage", 
        link: "Back to login",
      }),
      interlocutoritem: new InterlocutorItem({ 
        name: "Boss" 
      }),
      messageinput: new MessageInput({
        placeholder: "Type something there", 
        name: "message"
      }),
      lists: [
        new ChatItem({
          name: 'Boss', 
          message: 'Вот поэтому',
        }),
        new ChatItem({
          name: 'Those fellow', 
          message:'Текст текст текст Текст текст текст Текст текст текст Текст текст текст Текст текст текст',
        }),
        new ChatItem({
          name: 'Oleg', 
          message:'Приветики! У нас есть новые правки!!!)))', 
          avatar: "src/assets/avatar.png",
        }),
      ],
      lists1: [
        new MessageItem ({
          time: "06:20",
          date: "10.06.2024",
          text: "Посмотри правки, они на почте",
        }),
        new MessageItem({
          time: "06:26",
          date: "10.06.2024",
          text: "????",
        }),
        new MessageItem({
          time: "06:28",
          date: "10.06.2024",
          text: "Значит, премия тебе не нужна",
        }),
        new MessageItem({
          time: "10:42",
          date: "10.06.2024",
          toMe: "message-item__not-my-message",
          text: "Я у вас уже втрой день не работаю!!",
        }),
        new MessageItem({
          time: "10:43",
          date: "10.06.2024",
          toMe: "message-item__not-my-message",
          text: "Вот поэтому",
        }),
      ], 
    });
  }

  render() {
    return ChatPageRaw;
  }
}
