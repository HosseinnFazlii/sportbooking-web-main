'use client'
// libs/core-ui/src/utils/auth-helper.ts
import { authConfig } from "../configs";

export const getLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key) || undefined;
    }
}

export const setLocalStorage = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
        return true;
    }
    return false;
}

export const clearLocalStorage = (keys: string[]) => {
    if (typeof window !== 'undefined') {
        keys.forEach(key => {
            window.localStorage.removeItem(key);
        });
        return true;
    }
    return false;
}

// ** Retrieve the stored token
export const getToken = () => {
    return getLocalStorage(authConfig.storageTokenKeyName);
}

// ** Set the token
export const setToken = (token: string) => {
    return setLocalStorage(authConfig.storageTokenKeyName, token);
}

// ** Retrieve the stored user data
export const getUserData = () => {
    const value = getLocalStorage(authConfig.storageUserDataKeyName);
    return value ? JSON.parse(value) : undefined;
}

// ** Set the user data
export const setUserData = (userData: string) => {
    return setLocalStorage(authConfig.storageUserDataKeyName, userData);
}

export const clearAuth = () => {
    return clearLocalStorage([authConfig.storageTokenKeyName, authConfig.storageUserDataKeyName]);
}

// ** Remove the token
export const removeToken = () => {
    return clearLocalStorage([authConfig.storageTokenKeyName]);
}
