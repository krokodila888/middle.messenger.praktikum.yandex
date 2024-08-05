import './big-header.scss';
import Block from '../../tools/Block';
import { Logo, Title, Link, Avatar, ChatIcon } from '../../components';
import BigHeaderRaw from './big-header.hbs?raw';

interface Props {
  [key: string]: string;
}

export class BigHeader extends Block {
  constructor(props: Props) {
    super({ ...props,
      logo: new Logo({ }),
      title: new Title({ title: "Common ", span: "chat" }),
      link1: new Link({ page: "profile", link: "Your profile", className: "link__link_medium" }),
      avatar: new Avatar({ }),
      link2: new Link({ page: "chat", link: "Your chats", className: "link__link_medium" }),
      chaticon: new ChatIcon({ }),
    });
  }
  render() {
    return BigHeaderRaw;
  }
}
