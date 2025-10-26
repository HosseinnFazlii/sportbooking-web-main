import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthValuesType, IAuthProvider, UserDataType } from './types';
import { defaultAuthProvider } from './defaultAuthProvider';
import { initializeAuth } from './initializeAuth';
import { handleLogin } from './handleLogin';
import { handleLogout } from './handleLogout';
import { handleRegister } from './handleRegister';
import { AuthContext } from './context';

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<UserDataType | undefined>(defaultAuthProvider.user);
    const [loading, setLoading] = useState<boolean>(defaultAuthProvider.loading);
    const router = useRouter();

    useEffect(() => {
        initializeAuth(setLoading, setUser);
    }, []);

    const values: AuthValuesType = {
        user,
        loading,
        setUser,
        setLoading,
        login: async (params, errorCallback) => handleLogin(params, setUser, errorCallback, setLoading),
        logout: async () => handleLogout(router, setUser, setLoading),
        register: async (params, errorCallback) => handleRegister(params, setUser, errorCallback, setLoading)
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};