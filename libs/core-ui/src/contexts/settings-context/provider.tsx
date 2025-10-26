import { useState, useEffect, FC, useCallback } from 'react'
import { ISettingsProvider, Settings } from "./types";
import { defaultSettingsProvider } from './defaultSettingsProvider';
import { handleRestoreSettings } from './handleRestoreSettings';
import { handleStoreSettings } from './handleStoreSettings';
import { SettingsContext } from './context';
import { applyDerivedSettings } from './deriveSettings';
import { setActiveCalendar } from '../../utils/date-manager';

export const SettingsProvider: FC<ISettingsProvider> = ({ children, pageSettings }) => {
    // ** State
    const [settings, setSettings] = useState<Settings>({ ...defaultSettingsProvider })

    const commitSettings = useCallback((next: Settings, persist: boolean) => {
        const resolved = applyDerivedSettings(next);

        if (persist) {
            handleStoreSettings(resolved);
        }

        setSettings(resolved);

        return resolved;
    }, []);

    const saveSettings = useCallback((updatedSettings: Settings) => {
        commitSettings(updatedSettings, true);
    }, [commitSettings]);

    useEffect(() => {
        const restoredSettings = handleRestoreSettings();

        if (restoredSettings) {
            commitSettings(restoredSettings, false);
        } else {
            commitSettings(defaultSettingsProvider, false);
        }
    }, [commitSettings]);

    useEffect(() => {
        if (!pageSettings) {
            return;
        }

        setSettings(prevState => {
            const merged = applyDerivedSettings({ ...prevState, ...pageSettings });
            return merged;
        });
    }, [pageSettings]);

    useEffect(() => {
        if (settings.layout !== 'horizontal') {
            return;
        }

        if (settings.mode === 'semi-dark') {
            saveSettings({ ...settings, mode: 'light' });
            return;
        }

        if (settings.appBar === 'hidden') {
            saveSettings({ ...settings, appBar: 'fixed' });
        }
    }, [settings.appBar, settings.layout, settings.mode, saveSettings]);

    useEffect(() => {
        setActiveCalendar(settings.calendar);
    }, [settings.calendar]);

    return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}
