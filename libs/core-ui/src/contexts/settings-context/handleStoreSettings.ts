'use client';

import { Settings } from "./types"

export const handleStoreSettings = (settings: Settings) => {
    const initSettings = Object.assign({}, settings);

    delete initSettings.appBar;
    delete initSettings.footer;
    delete initSettings.layout;
    delete initSettings.navHidden;
    delete initSettings.lastLayout;
    delete initSettings.toastPosition;
    delete initSettings.dateUtils;
    window.localStorage.setItem('settings', JSON.stringify(initSettings));
}
