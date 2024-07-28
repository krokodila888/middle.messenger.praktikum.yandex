/* eslint-disable @typescript-eslint/no-explicit-any */
import cloneDeep from "../utils/clone-deep";

type TAction = {
  type: string;
  [key: string]: any;
};
type TReducer<S> = (state: S, action: TAction) => S;
type TSubscriber<S> = (state: S) => void;

interface IState {
  [key: string]: any;
}

const state: IState = {
  buttonText: 'Initial text',
  user: {
    avatar: null,
    email: "",
    first_name: "",
    id: null, 
    login: "",
    phone: "",
    second_name: "",
  },
  first_name: '',
  chats: null,
  currentChat: null,
  registerError: null,
  loginError: null,
};

interface IStore<S> {
  getState: () => S;
  subscribe: (fn: TSubscriber<S>) => void;
  dispatch: (action: TAction) => void;
}

const reducer: TReducer<IState> = (state, action) => {
  const newState: IState = cloneDeep(state);
  if (action.type === 'SET_TEXT') {
    console.log('SET_TEXT')
    newState.buttonText = action.buttonText;
    return newState;
  } else if (action.type === 'SET_USER') {
    console.log('SET_USER')
    newState.user = action.user;
    newState.first_name = action.user.first_name;
    return newState;
  } else if (action.type === 'SET_CHATS') {
    console.log('SET_CHATS')
    newState.chats = action.chats;
    return newState;
  } else if (action.type === 'SET_PASSWORD') {
    console.log('SET_PASSWORD')
    newState.user.password = action.password;
    return newState;
  } else if (action.type === 'SET_CURRENT_CHAT') {
    console.log('SET_CURRENT_CHAT')
    newState.currentchat = action.currentchat;
    return newState;
  } else if (action.type === 'SET_REGISTER_ERROR') {
    console.log('SET_REGISTER_ERROR')
    newState.registerError = action.error;
    return newState;
  } else if (action.type === 'SET_LOGIN_ERROR') {
    console.log('SET_LOGIN_ERROR')
    newState.loginError = action.error;
    return newState;
  } else {
    return state;
  }
};

const createStore = <S>(reducer: TReducer<S>, initialState: S): IStore<S> => {
  const subscribers: TSubscriber<S>[] = [];
  let currentState = initialState;

  return {
    getState: () => currentState,
    subscribe: (fn: TSubscriber<S>) => {
      subscribers.push(fn);
      fn(currentState);
    },
    dispatch: (action: TAction) => {
      currentState = reducer(currentState, action);
      subscribers.forEach((fn) => fn(currentState));
    },
  };
};

const store = Object.freeze(createStore(reducer, state));

export default store;