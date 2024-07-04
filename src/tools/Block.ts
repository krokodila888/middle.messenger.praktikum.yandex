import EventBus from "./EventBus";
import Handlebars from "handlebars";
import {v4 as makeUUID} from 'uuid';
export default class Block {

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _id: string;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  public props: Record<string, any>;
  public children: Record<string, typeof this>;
  public lists: Record<string, (typeof this)[]>;
  private _meta: {
    tagName: string;
    props: Record<string, any>;
  };

  constructor(tagName: string = 'div', propsWithChildren:
    | Record<string, Block | Record<string, unknown>>
    | Record<string, unknown>,) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._id = makeUUID();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props, _id: this._id });
    this.children = children;
    this.lists = lists;
    this._meta = {
      tagName,
      props,
    };
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents() {
    const {events = {}} = this.props;
    Object.keys(events).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName])
    });
  }

  /*_removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }*/

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
  }

  componentDidMount(oldProps?: Record<string, any>) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps !== newProps) return true;
    else return false
  }

  _getChildrenPropsAndProps(
    propsAndChildren:
      | Record<string, Block | Record<string, any>>
      | Record<string, any>,
  ) {
    const children: Record<string, any> = {};
    const props = {} as Record<string, any>;
    const lists: Record<string, this[]> = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value as typeof this;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props, lists };
  }


  addAttributes(): void {
    const {attr = {}} = this.props;
    Object.entries(attr as Record<string, string>).forEach(([key, value]) => {
      this._element!.setAttribute(key, value);
    });
  }

  setProps = (nextProps: Record<string, any>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const propsAndStubs = { ...this.props };
    const _tmpId = makeUUID();
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, _child]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });
    //this._removeEvents();

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    //comment if you want to see
    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      stub!.replaceWith(child.getContent() as HTMLElement);
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement('template') as HTMLTemplateElement;;
      child.forEach(item => {
        if (item instanceof Block) {
            listCont.content.append(item.getContent() as HTMLElement);
        } else {
            listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      stub!.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element) {
      this._element.replaceWith(newElement as HTMLElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  render(): void | string {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Record<string, any>) {
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        const newTarget = { ...target, [prop]: value };
        Object.assign(target, newTarget);
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      }
    });
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}
