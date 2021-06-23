import { AxiosRequestConfig } from 'axios';
import { getItem } from '../../lib/localStorageRequest';

export const getConfig = () => {
    console.log('localstorage',localStorage.getItem('access-token'));
    const accessToken = getItem('access-token');
    console.log('localStorage decoded',accessToken);
    
    if(!accessToken){
        return {};
    }
    
    const config: AxiosRequestConfig = {
        headers: { 'authorization': accessToken }
    }
    console.log('config',config);
    
    return config;
}
