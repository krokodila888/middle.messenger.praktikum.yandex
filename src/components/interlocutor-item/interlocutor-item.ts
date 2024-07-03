import './interlocutor-item.scss';
import InterlocutorItemRaw from './interlocutor-item.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class InterlocutorItem extends Block {
  constructor(props: Props) {
    super('div', {
      ...props
    });
  }
  override render() {
    return InterlocutorItemRaw;
  }
}
