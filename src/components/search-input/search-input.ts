import './search-input.scss';
import SearchInputRaw from './search-input.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class SearchInput extends Block {
  constructor(props: Props) {
    super({ ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const input = document.querySelector(".search-input__element") as HTMLInputElement;
          type MyType = {
            [key: string]: string;
          };
          const res: MyType = {};
          if (input) {
            res[input.name] = input.value;
          };
          console.log(res);
        }
      },
    });
  }
  render() {
    return SearchInputRaw;
  }
}
