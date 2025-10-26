import { authConfig } from '../../configs';
import { axiosInstance, getURLWithVersion, setToken, setUserData, updateAxiosAuthHeader } from '../../utils';
import { AxiosErrorType, LoginParams, UserDataType } from './types';

export const handleLogin = async (params: LoginParams, setUser: (value: UserDataType) => void, errorCallback?: (err: AxiosErrorType) => void, setLoading?: (value: boolean) => void): Promise<boolean> => {
    try {
        if(setLoading){
            setLoading(true);
        }
        const response = await axiosInstance.post(getURLWithVersion(authConfig.loginEndpoint), params);
        if (response.data.user) {
            console.log(response.data.user);
            if (params.rememberMe) {
                setToken(response.data.access_token);
                updateAxiosAuthHeader();
            }
            setUser({ ...response.data.user });
            if (params.rememberMe) {
                setUserData(JSON.stringify(response.data.user));
            }
            
            if(setLoading){
                setLoading(false);
            }
            return true;
        }
    } catch (err) {
        console.error(err);
        if (errorCallback) errorCallback(err as AxiosErrorType);
    }
    if(setLoading){
        setLoading(false);
    }
    return false;
};