import { AuthValuesType } from './types';

export const defaultAuthProvider: AuthValuesType = {
    user: undefined,
    loading: true,
    setUser: () => undefined,
    setLoading: () => Boolean,
    login: () => Promise.resolve(false),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
};
