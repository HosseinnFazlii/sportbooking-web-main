import { NextRouter } from 'next/router';
import { clearAuth } from '../../utils';
import { UserDataType } from './types';

export const handleLogout = (router: NextRouter, setUser: (value?: UserDataType) => void, setLoading?: (value: boolean) => void) => {
    if (setLoading) {
        setLoading(true);
    }
    setUser();
    clearAuth();
    if (setLoading) {
        setLoading(false);
    }
    router.push('/auth/login');
};
