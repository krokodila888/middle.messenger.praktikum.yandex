import Block from './Block';
import Route from './Route';

export default class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private _currentRoute: Route | null = null;
  private history = window.history;
  private _rootQuery: string = '';

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const currentTarget = event.currentTarget as Window;
      this._onRoute(currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(/*route, pathname*/);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  /*getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }*/

  getRoute = (pathname: string) => {
    const _route = this.routes.find((route) => route.match(pathname));
    if (_route) return _route
    else {
      window.location.pathname = 'error404';
      return this.routes.find((item) => item.match('error404'));
    }
  };
}