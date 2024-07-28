import './chat-page.scss';
import Block, { IProps } from '../../tools/Block';
import { Logo, Title, ChatItem, Link, ChatIcon, SearchInput, InterlocutorItem, MessageItem, MessageInput, NewChatInput } from '../../components';
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
      chaticon: new ChatIcon({
        src: `/assets/avatar.png`
      }),
      interlocutoritem: new InterlocutorItem({ 
        name: "Boss" 
      }),
      messageinput: new MessageInput({
        placeholder: "Type something there", 
        name: "message"
      }),
      newchatinput: new NewChatInput({
      }),
      lists: [
        new ChatItem({
          title: '', 
          last_message: '',
        })
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

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    console.log(newProps.avatar);
    //this.children.firstnameinput.setProps({chats: newProps.chats});
    if (newProps.avatar !== null && newProps.avatar !== '' && newProps.avatar !== undefined) {
      console.log(newProps.avatar);
      this.children.chaticon.setProps({src: `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`})
    } else {
      this.children.chaticon.setProps({src: `/assets/avatar.png`})
    }
    console.log(newProps.lists);
    console.log(this.lists);
    console.log(this.lists.lists);

    /*if (newProps.chats) {
      this.lists = newProps.chats
    }*/
    return true;
  }

  render() {
    return ChatPageRaw;
  }
}
