import { Type } from './action.type';

export const InitialState = {
  theme : 'dark',
  user:[],
};

export const Reducer = (state, action) => {
  switch (action.type) {
     case Type.SET_THEME:
      return {
        ...state,
        theme: action.theme
      };
      case Type.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      };
     case Type.SET_USER:
      return {
        ...state,
        user: action.user
      }   
    default:
      return state;
  }
};
