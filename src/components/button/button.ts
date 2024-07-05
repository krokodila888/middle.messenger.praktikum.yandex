import './button.scss';
import Block from '../../tools/Block';
import ButtonRaw from './button.hbs?raw';

interface Props {
  [key: string]: string;
}

export class Button extends Block {
  constructor(props: Props) {
    super('button', { ...props,
      events: {
        click: (e: SubmitEvent) => {
          e.preventDefault();
          const inputs = document.querySelectorAll('input');
          type MyType = {
            [key: string]: string;
          };
          const res: MyType = {};
          inputs.forEach((item) => {
            res[item.name] = item.value;
          })
          console.log(res);
        }
      },
    });
  }
  render() {
    return ButtonRaw;
  }
}
