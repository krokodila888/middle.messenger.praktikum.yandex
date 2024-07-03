import './page-title.scss';
import PageTitleRaw from './page-title.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class PageTitle extends Block {
  constructor(props: Props) {
    super('div', {
      ...props
    });
  }
  override render() {
    return PageTitleRaw;
  }
}
