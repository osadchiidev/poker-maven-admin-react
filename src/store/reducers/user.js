import {produce} from 'immer';
import {
    LOGIN
} from '../actions/action-type';

export const initialState = {
  isLogin: localStorage.getItem("token"),
  mode: localStorage.getItem('mode') || 'light',
  user: {
    data: {},
    loading: false
  }
};

export default function (state = initialState, action = {}) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
      default:
        return state;
    }
  });
}
