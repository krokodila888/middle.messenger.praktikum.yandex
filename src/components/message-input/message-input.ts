import './message-input.scss';
import MessageInputRaw from './message-input.hbs?raw';
import Block from '../../tools/Block';

interface Props {
  [key: string]: string;
}

export class MessageInput extends Block {
  constructor(props: Props) {
    super('form', {
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const input1 = document.querySelector(".message-input__element") as HTMLInputElement;
          type MyType = {
            [key: string]: string;
          };
          let res: MyType = {};
          if (input1) {
            res[input1.name] = input1.value;
          };
          console.log(res);
        }
      },
    });
  }
  override render() {
    return MessageInputRaw;
  }
}
