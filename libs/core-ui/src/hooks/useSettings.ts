import { useContext } from 'react'
import { SettingsContext, SettingsContextValue } from '../contexts'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext);