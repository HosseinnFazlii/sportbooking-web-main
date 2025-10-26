import { createContext } from 'react'
import { SettingsContextValue } from "./types";
import { defaultSettingsProvider } from './defaultSettingsProvider';

export const SettingsContext = createContext<SettingsContextValue>({
    saveSettings: () => null,
    settings: defaultSettingsProvider
})

export const SettingsConsumer = SettingsContext.Consumer;