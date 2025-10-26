import axios from 'axios';
import { authConfig } from '../../configs';
import { AxiosErrorType, RegisterParams, UserDataType } from './types';
import { handleLogin } from './handleLogin';

export const handleRegister = async (params: RegisterParams, setUser: (value: UserDataType) => void, errorCallback?: (err: AxiosErrorType) => void, setLoading?: (value: boolean) => void) => {
    try {
        // const response = await axios.post(authConfig.registerEndpoint, params);
        // if (!response.data.error) {
        //     handleLogin({ mobile: params.mobile, password: params.password }, setUser);
        // } else if (errorCallback) {
        //     errorCallback(response.data.error);
        // }
    } catch (err) {
        if (errorCallback) errorCallback(err as AxiosErrorType);
    }
};
