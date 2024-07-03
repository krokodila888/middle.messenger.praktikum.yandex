import './search-input.scss';
import SearchInputRaw from './search-input.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class SearchInput extends Block {
  constructor(props: Props) {
    super('div', { ...props
    });
  }
  override render() {
    return SearchInputRaw;
  }
}
