'use client';

import { defaultSettingsProvider, staticSettings } from "./defaultSettingsProvider"
import { Settings } from "./types"
import { applyDerivedSettings } from './deriveSettings';

export const handleRestoreSettings = (): Settings | undefined => {
    let settings: Settings | undefined = undefined;

    try {
        const storedData: string | null = window.localStorage.getItem('settings');

        if (storedData) {
            const parsedSettings = JSON.parse(storedData) as Partial<Settings>;
            settings = applyDerivedSettings({ ...defaultSettingsProvider, ...parsedSettings, ...staticSettings });
        } else {
            settings = defaultSettingsProvider;
        }
    } catch (err) {
        console.error(err)
    }

    return settings;
}
