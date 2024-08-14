import { expect } from "chai";
import Router from "./Router";
import Block, { IProps} from "./Block";

const Routes = {
  mainPage: "/",
  testPage: "/page",
  errorPage: "*",
};

describe("Router", () => {
  const router = new Router("app");
  let PageClass: typeof Block;
  let TestPageClass: typeof Block;
  let ErrorPageClass: typeof Block;

  before(() => {
    class Page extends Block {
      constructor(props: IProps) {
        super({
          ...props,
        });
      }

      render(): string {
        return `<div>
          <p id="test">{{text}}</p>
          </div>`;
      }
    }

    class TestPage extends Block {
      constructor(props: IProps) {
        super({
          ...props,
        });
      }

      render(): string {
        return `<div>
					<p id="test">{{text}}</p>
				  </div>`;
      }
    }

    class ErrorPage extends Block {
      constructor(props: IProps) {
        super({
          ...props,
        });
      }

      render(): string {
        return `<div>
					<p id="test">{{text}}</p>
				  </div>`;
      }
    }

    PageClass = Page;
    TestPageClass = TestPage;
    ErrorPageClass = ErrorPage;

    const router = new Router("app");
    router
      .use("/", PageClass)
      .use("/page", TestPageClass)
      .use("*", ErrorPageClass);
    });

    it(`Have to return route /`, () => {
        const route = router.getRoute(Routes.mainPage);
        expect(route?.match(Routes.mainPage)).to.be.eq(true);
    });

    it(`Have to return route /page`, () => {
        const route = router.getRoute(Routes.testPage);
        expect(route?.match(Routes.testPage)).to.be.eq(true);
    });

    it(`Have to return route *`, () => {
        const route = router.getRoute(Routes.errorPage);
        expect(route?.match(Routes.errorPage)).to.be.eq(true);
    });
    it(`Have to return previous route`, () => {
      const route = router.getRoute(Routes.mainPage);
      router.use("/page", TestPageClass);
      router.back();
      expect(route?.match(Routes.mainPage)).to.be.eq(true);
    });
});
