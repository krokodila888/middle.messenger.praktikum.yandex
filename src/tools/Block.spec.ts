import { expect } from "chai";
import Sinon from "sinon";
import Block from "./Block";
import type { IProps } from "./Block";

describe("Block", () => {
  let BlockComponent: typeof Block;

  before(() => {
    class Component extends Block {
      constructor(props: IProps) {
        super({ ...props });
      }

      render(): string {
        return ` <div>{{#if text}}{{ text }}{{/if}}{{#if Component}}{{{ Component }}}{{/if}}</div> `;
      }
    }

    BlockComponent = Component;
  });

  describe("Rendering and updating", () => {

    it('Have to render props', () => {
      const textData = 'Test';
      const component = new BlockComponent({ text: textData });
      const res = (component.element as unknown as HTMLDivElement)?.innerHTML;
      expect(res).to.be.eq(textData);
    })

    it("Have to render Component with text", () => {
      const text = "Test test test";
      const componentWithText = new BlockComponent({ text });
      const component = new BlockComponent({ Component: componentWithText });
      const content = component.getContent()?.textContent;
      expect(content).to.be.eq(text);
    });

    it("Have to update text in components", () => {
      const text = "Old text";
      const component = new BlockComponent({ text: text });
      const newText = "New text";
      component.setProps({ text: newText });
      const content = component.getContent()?.textContent;
      expect(content).to.be.eq(newText);
    });
  });

  describe("Rendering", () => {
    it('Have to Invoke _render', () => {
      const buttonComponent = new BlockComponent({ text: "text" });
      const spyDCM = Sinon.spy(buttonComponent, '_render');
      buttonComponent.setProps({text: "text1"});
      expect(spyDCM.calledOnce).to.be.true;
    })
  });

  describe("Click reaction", () => {
    it("Have to react for click event", () => {
      const handleClick = Sinon.stub();
      const component = new BlockComponent({ text: "text", events: { click: handleClick } });
      const evt = new MouseEvent("click");
      component.getContent()?.dispatchEvent(evt);
      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
