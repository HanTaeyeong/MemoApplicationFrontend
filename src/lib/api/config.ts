import { AxiosRequestConfig } from 'axios';
import { getItem } from '../../lib/localStorageRequest';

export const getConfig = () => {
    const accessToken = getItem('access-token');

    const config: AxiosRequestConfig = {
        headers: { 'authorization': accessToken }
    }

    return config;
}
