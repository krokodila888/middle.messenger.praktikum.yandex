import './chat-page.scss';
import Block, { IProps } from '../../tools/Block';
import { Logo, Title, ChatItem, Link, ChatIcon, SearchInput, InterlocutorItem, MessageItem, MessageInput, NewChatInput, UserItem, AddMessagesButton } from '../../components';
import ChatPageRaw from './chat-page.hbs?raw';
import store from '../../tools/Store';
import { TChatInfo1, TMessage, TOtherUserType } from '../../types/types';
export class ChatPage extends Block {
  constructor() {
    super({
      chatusersblock: null,
      logo: new Logo({ }),
      generaltitle: new Title({ 
        title: "Common ", 
        span: "chat" }),
      profilelink: new Link({ 
        page: "profile", 
        link: "Your profile", 
        className: "link__link_medium" }),
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
      addmessagesbutton: new AddMessagesButton({}),
      lists: [
      ],
      users: [
      ],
      lists1: [
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
      const newchats = store.getState().chats.map((item: TChatInfo1) => {
        return new ChatItem({
          title: `${item.title}`,
          id: `${item.id}`, 
          last_message: (item.last_message === null) ? 'Сообщений нет' : item.last_message.content, 
          avatar: item.avatar !== null ? `https://ya-praktikum.tech/api/v2/resources${item.avatar}` : `/assets/avatar.png`,
          current: (store.getState().currentChat.id !== null && store.getState().currentChat.id === item.id) ? 'chat-item_chosen' : ''
        })
      });
      this.lists.lists = newchats;
    }

    if (newProps.currenttitle !== undefined 
      && newProps.currentid 
      && newProps.currentid !== null
      && newProps.currentid !== undefined) {
      //make chatitems  
        if (store.getState().currentChat.users) {
          const users1 = store.getState().currentChat.users.map((item: TOtherUserType) => {
            return new UserItem({
              name: `${item.first_name} ${item.second_name}`,
              id: `${item.id}`, 
              avatar: item.avatar !== null ? `https://ya-praktikum.tech/api/v2/resources${item.avatar}` : `/assets/avatar.png`,
            })
          });
          this.lists.users = users1;
        }
        
      //make messegaitems
        if (store.getState().messages !== null 
        && store.getState().messages !== undefined 
        && store.getState().messages.length !== 0) {
          const newmessages = store.getState().messages.map((item: TMessage) => {
            const users = store.getState().currentChat.users as TOtherUserType[];
            const user1 = users.find((user) => Number(user.id) === item.user_id) as TOtherUserType;
            const userAvatar = (store.getState().user.avatar !== null && store.getState().user.avatar !== undefined) ? `https://ya-praktikum.tech/api/v2/resources${store.getState().user.avatar}` : `/assets/avatar.png`;
            const otherUserAvatar = (user1 && user1.avatar && user1.avatar !== null && user1.avatar !== undefined) ? `https://ya-praktikum.tech/api/v2/resources${user1.avatar}` : "/assets/no-avatar-icon.png";
            return new MessageItem({
              time: `${item.time.substring(11,16)}`,
              text: `${item.content}`,
              date: `${item.time.substring(0,10)}`,
              toMe: Number(item.user_id) === store.getState().user.id ? 'message-item__not-my-message' : '',
              avatar: Number(item.user_id) === store.getState().user.id ? userAvatar : otherUserAvatar,
              name: Number(item.user_id) === store.getState().user.id ? `${store.getState().user.first_name} ${store.getState().user.second_name}` : `${user1.first_name} ${user1.second_name}`,
            });
          })
        this.lists.lists1 = newmessages.reverse();
        const chat = store.getState().currentChat;
        let usersCount;
        if (chat !== undefined && chat !== null && chat.users && chat.users !== undefined && chat.users !== null) {
          usersCount = chat.users!.length;
        } else {
          usersCount = 0;
        }
        this.children.interlocutoritem.setProps({ 
          name: newProps.currenttitle,
          avatar: newProps.currentavatar === null ? `/assets/avatar.png` : `https://ya-praktikum.tech/api/v2/resources${newProps.currentavatar}`,
          id: newProps.currentid
        });
        (document.getElementById(newProps.currentid as string) as HTMLDivElement)?.classList.add('chat-item_chosen');
        }
      if (store.getState().messages.length === 0) {
        this.lists.lists1 = []
      }
    }
    
    if (newProps.currentid === null) {
      this.children.interlocutoritem.setProps({ 
        name: null,
        avatar: "/assets/no-avatar-icon.png",
      });
      this.lists.lists1 = [];
    }    
    return true;
  }

  render() {
    return ChatPageRaw;
  }
}
