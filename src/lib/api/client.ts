import axios from 'axios';

//axios.defaults.baseURL = 'https://ec2-52-79-233-83.ap-northeast-2.compute.amazonaws.com:4311/simplememo.com'

// axios.defaults.baseURL = 'http://localhost:4311';

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['withCredentials'] = true;
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
const client = axios.create();
export default client;
