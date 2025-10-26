import { ReactNode } from "react";

// export type ErrCallbackType = (err: { [key: string]: string }) => void
// export type ErrCallbackType = (err: any) => void;
export type AxiosErrorType = {
    response?: {
        data: Record<string, unknown>;
        status: number;
        statusText: string;
        headers: Record<string, string>;
        config: Record<string, unknown>;
    };
    request?: unknown;
    message: string;
    config: Record<string, unknown>;
};


export type ErrCallbackType = (err: AxiosErrorType) => void;


export type LoginParams = {
    mobile: string | number;
    password: string;
    rememberMe?: boolean;
}

export type RegisterParams = {
    mobile: string | number;
    password: string;
}

export type UserDataType = {
    id: number;
    roleId: number;
    roleName: string;
    roles: Array<{
        id: number;
        name: string;
    }>;
    menus: Array<{
        id: number;
        name: string;
        url: string;
        icon: string;
        parentId: number;
    }>;
    mobile: string;
    mobileVerified: boolean;
    name: string;
    fullName?: string;
    email: string;
    picture?: string | { type: 'Buffer', data: Buffer } | null;
    createdAt: Date;
}

export type AuthValuesType = {
    loading: boolean;
    logout: () => Promise<void>;
    user: UserDataType | undefined;
    setLoading: (value: boolean) => void;
    setUser: (value: UserDataType | undefined) => void;
    login: (params: LoginParams, errorCallback?: ErrCallbackType) => Promise<boolean>;
    register: (params: RegisterParams, errorCallback?: ErrCallbackType) => Promise<void>;
}

export type IAuthProvider = {
    children: ReactNode;
};
