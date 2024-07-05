import './button.scss';
import Block from '../../tools/Block';
import ButtonRaw from './button.hbs?raw';
import { validateItem, validateProfileItem } from '../../utils/validation';

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
          });
          if (document.querySelector(`.button__profile`)) {
            inputs.forEach((item) => {
              validateProfileItem(item);
            });
          };
          if (document.querySelector(`.button__login`) || 
          document.querySelector(`.button__register`)) {
            inputs.forEach((item) => {
              validateItem(item);
            });
          }  
          console.log(res);
        },
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const inputs = document.querySelectorAll('input');
          type MyType = {
            [key: string]: string;
          };
          const res: MyType = {};
          inputs.forEach((item) => {
            res[item.name] = item.value;
          });
          if (document.querySelector(`.button__profile`)) {
            inputs.forEach((item) => {
              validateProfileItem(item);
            });
          };
          if (document.querySelector(`.button__login`) || 
          document.querySelector(`.button__register`)) {
            inputs.forEach((item) => {
              validateItem(item);
            });
          }          
          console.log(res);
        }
      },
    });
  }
  render() {
    return ButtonRaw;
  }
}
