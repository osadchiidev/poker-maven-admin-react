import { put, call, takeLatest } from 'redux-saga/effects';
import axios  from '../../utils/axios';
import {
    loginError,
    loginSuccess,
} from '../actions/user';
import {
    LOGIN,
} from '../actions/action-type';
import { toast } from "react-toastify";

export function* loginRequest(action) {
    try {
        const res = yield call(axios.post, '/user/login', action.data);
        const {token, RealName, Avatar, success, msg } = res.data;
        if (msg) {
            if (success)
                toast.success(msg);
            else 
                toast.warn(msg);
        }
        if (success) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", { RealName, Avatar});
            yield call(axios.setToken, token);
            yield put(loginSuccess(res.data));
            window.location.reload();
        }     
        
    } catch (e) {
        console.log(e)
        toast.warn(e?.response?.data?.message || 'An error occurred');
        yield put(loginError(e));
    }
}

export default function* () {
    yield takeLatest(LOGIN, loginRequest);
}
