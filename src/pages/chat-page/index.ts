import './chat-page.scss';
import Block, { IProps } from '../../tools/Block';
import { Logo, Title, ChatItem, Link, ChatIcon, SearchInput, InterlocutorItem, MessageItem, MessageInput, NewChatInput, UserItem } from '../../components';
import ChatPageRaw from './chat-page.hbs?raw';
import store from '../../tools/Store';
import { TChatInfo1, TChatInfo2, TOtherUserType } from '../../types/types';
import { chatController } from '../../controllers/chats-controller';
import { WSACTIONS } from '../../tools/Websocket';
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
      lists: [
      ],
      users: [

      ],
      lists1: [
        /*new MessageItem ({
          time: "06:20",
          date: "10.06.2024",
          text: "Посмотри правки, они на почте",
        }),
       */
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
      //console.log('store!!')
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

        //console.log(chatController.getConnectionById(newProps.currentid as number));
        /*chatController.getConnectionById(newProps.currentid as number)!.send({
          content: "0",
          type: "get old"
        });*/
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        /*chatController.getConnectionById(newProps.currentid as number)!.on(WSACTIONS.WS_GET_MESSAGE, async (data: any) => {
          //const сhats = store.getState().chats;
          //const chat1 = chats.find((item: TChatInfo2) => item.id === chat.id);
          console.log('data');
          console.log(data);
          store.dispatch({
            type: 'SET_CHAT_MESSAGES',
            data: data,
            id: newProps.currentid
          });
        })*/

        const users = (store.getState().chats as TChatInfo2[]).find((item) => item.id === newProps.currentid);
        let aaa;
        
        if (users !== undefined && users !== null) {
          aaa = users.users!.length;
        }
        this.children.interlocutoritem.setProps({ 
        name: newProps.currenttitle,
        avatar: newProps.currentavatar === null ? `/assets/avatar.png` : `https://ya-praktikum.tech/api/v2/resources${newProps.currentavatar}`,
        //users: newProps.users,
        id: newProps.currentid
      });
      //console.log(document.getElementById(newProps.currentid as string) as HTMLDivElement);
      (document.getElementById(newProps.currentid as string) as HTMLDivElement)?.classList.add('chat-item_chosen');

    }
    if (newProps.currentid === null) {
      //console.log('current chat = null');
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
