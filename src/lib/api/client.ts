import axios from 'axios';
import { getItem } from '../../lib/localStorageRequest';

//axios.defaults.baseURL = 'https://ec2-52-79-233-83.ap-northeast-2.compute.amazonaws.com:4311/simplememo.com'

// axios.defaults.baseURL = 'http://localhost:4311';

const accessToken = getItem('access-token');

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

// axios.defaults.headers.common['withCredentials'] = true;
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
// axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Set-Cookie';

const client = axios.create();
export default client;
