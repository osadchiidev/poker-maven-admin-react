import axios from 'axios';
import constants from './config';

const instance = axios.create({
  baseURL: constants.BASE_URL
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

/* ********** FUNCTIONS  ********** */
instance.setToken = (accessToken) => {
  instance.defaults.headers.Authorization = `Token ${accessToken}`;
};

export default instance;
