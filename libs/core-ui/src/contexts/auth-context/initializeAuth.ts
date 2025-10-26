// import axios from 'axios';
// import { authConfig } from '../../configs';
import { getToken, getUserData, updateAxiosAuthHeader } from '../../utils';
import { UserDataType } from './types';

export const initializeAuth = async (setLoading: (value: boolean) => void, setUser: (value: UserDataType | undefined) => void) => {
    const storedToken = getToken();
    if (storedToken) {
        setLoading(true);
        try {
            // const response = await axios.get(authConfig.meEndpoint);
            // setUser({ ...response.data.userData });
            setUser(getUserData());
            updateAxiosAuthHeader();
        } catch (error) {
            // handle your error logic here
            // setLoading(false);
            // potentially other error handling logic
        }
        setLoading(false);
    } else {
        setLoading(false);
    }
};
