/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "./Store";

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
