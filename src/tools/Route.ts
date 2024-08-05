import Block from './Block';
import { isEqual, PlainObject } from '../utils/is-equal';
import render from '../utils/render';

type Props = { rootQuery: string };

class Route {
  private readonly blockClass!: typeof Block;
  private pathname?: string;
  private block: Block | null;
  private readonly props!: Props;

  constructor(pathname: string, view: typeof Block, props: Props) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname as unknown as PlainObject, this.pathname as unknown as PlainObject);
  }

  render() {
    this.block = new this.blockClass({});
    this.block.preRender();
    render(this.props.rootQuery, this.block!);
    return;
  }
}

export default Route;
