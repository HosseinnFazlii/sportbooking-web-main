'use client'
// libs/core-ui/src/utils/axios-helper.ts

import axios from 'axios';
import { authConfig, settingsConfig } from '../configs';
import { getToken } from './auth-helper';

export const getURLWithVersion = (url: string) => {
    return `${url}?v=${settingsConfig.version}`;
}

// Create an Axios instance with default configurations
export const axiosInstance = axios.create({
    baseURL: settingsConfig.apiHost || '/api',
    headers: {
        [authConfig.jwtHttpHeaderName]: getToken()
    },
    timeout: 30000,
});

export const createCancelTokenSource = () => axios.CancelToken.source();

// Update the Axios instance headers whenever required
export const updateAxiosAuthHeader = () => {
    const token = getToken();
    if (token) {
        axiosInstance.defaults.headers[authConfig.jwtHttpHeaderName] = `Bearer ${token}`;
    }
};

export type { CancelTokenSource } from "axios";

export const downloadFile = (url: string) => {
    axiosInstance.get(getURLWithVersion(url), {
        responseType: 'blob'
    })
        .then(response => {
            // console.log(response);
            // Extract filename from the Content-Disposition header
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'downloaded_file';
            if (contentDisposition) {
                const filenameUTF8Regex = /filename[^;\n]*=(UTF-\d['"]*)((['"]).*?[.]$|[^;\n]*)?/;
                const matchesUTF8 = filenameUTF8Regex.exec(contentDisposition);
                if (matchesUTF8 != null && matchesUTF8[2]) {
                    filename = decodeURI(matchesUTF8[2].replace(/['"]/g, ''));
                } else {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(contentDisposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }
            }
            filename = filename.trim();
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        });
}