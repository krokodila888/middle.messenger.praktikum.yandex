import './chat-page.scss';
import Block, { IProps } from '../../tools/Block';
import { Logo, Title, ChatItem, Link, ChatIcon, SearchInput, InterlocutorItem, MessageItem, MessageInput, NewChatInput } from '../../components';
import ChatPageRaw from './chat-page.hbs?raw';
import store from '../../tools/Store';
import { TChatInfo1 } from '../../types/types';
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
      }),
      messageinput: new MessageInput({
        placeholder: "Type something there", 
        name: "message"
      }),
      newchatinput: new NewChatInput({
      }),
      lists: [
      ],
      lists1: [
        /*new MessageItem ({
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
        }),*/
      ], 
    });
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    if (newProps.avatar !== null && newProps.avatar !== '' && newProps.avatar !== undefined) {
      this.children.chaticon.setProps({src: `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`})
    } else {
      this.children.chaticon.setProps({src: `/assets/avatar.png`})
    }
    if (newProps.title1 !== null && newProps.title1 !== undefined) { 
      console.log('store!!')
      const newchats = store.getState().chats.map((item: TChatInfo1) => {
        return new ChatItem({
          title: `${item.title}`,
          id: `${item.id}`, 
          last_message: (item.last_message === null) ? 'Сообщений нет' : item.last_message.content, 
          avatar: `${item.avatar}`,
          current: (store.getState().currentChat.id === item.id) ? 'chat-item_chosen' : ''
        })
      });

      this.lists.lists = newchats;
    } 
    if (newProps.currenttitle !== undefined 
      && newProps.currentid 
      && newProps.currentid !== null
      && newProps.currentid !== undefined) {
      this.children.interlocutoritem.setProps({ 
        name: newProps.currenttitle,
        avatar: newProps.currentavatar,
      });
      console.log(document.getElementById(newProps.currentid as string) as HTMLDivElement);
      (document.getElementById(newProps.currentid as string) as HTMLDivElement).classList.add('chat-item_chosen');
    }
    if (newProps.currentid === null) {
      console.log('current chat = null');
      this.children.interlocutoritem.setProps({ 
        name: null,
        avatar: "/assets/no-avatar-icon.png",
      });
    }
    return true;
  }

  render() {
    return ChatPageRaw;
  }
}
