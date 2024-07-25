/* eslint-disable @typescript-eslint/no-explicit-any */
//import store from "./Store";
import store from "./Store";
import Block from "./Block";
import { isEqual } from "../utils/is-equal";
import { isPlainObject } from "../utils/is-plain-object";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Indexed<T = any> = {
  [key in string]: T;
};

interface IProps {
  [key: string]: unknown;
  events?: Record<string, EventListenerOrEventListenerObject>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function connect<T extends new (...args: any[]) => any>(Component: T, selector?: Function) {
  return class extends Component {
    constructor(...args: any[]) {
      super(...args);
        store.subscribe(() => {
          console.log('We are in store subscription')
          this.setProps(selector ? selector(store.getState()) : {});
        });
        console.log(this)
    }
  } 
}
