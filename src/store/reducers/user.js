import {produce} from 'immer';
import {
    LOGIN_SUCCESS,
    SET_MODE,
    LOGOUT,
    GET_BALANCE_SUCCESS,
    BUY_CHIP_SUCCESS,
    WITHDRAW_CHIP_SUCCESS
} from '../actions/action-type';

export const initialState = {
  isLogin: localStorage.getItem("token"),
  mode: localStorage.getItem('mode') || 'light',
  user: {
    data: JSON.parse(localStorage.getItem('user')),
    loading: false
  }
};

export default function (state = initialState, action = {}) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        draft.user.data = action.payload
        break;
      case SET_MODE:
        draft.mode = action.data;
        localStorage.setItem('mode', action.data);
        break;
      case LOGOUT:
        draft.isLogin = false;
        break;
      case GET_BALANCE_SUCCESS:
        draft.user.data.Balance = action.data.Balance;
        break;
      case BUY_CHIP_SUCCESS:
        draft.user.data.Balance = action.data.Balance;
        break;
      case WITHDRAW_CHIP_SUCCESS:
        draft.user.data.Balance = action.data.Balance;
        break;
      default:
        return state;
    }
  });
}
