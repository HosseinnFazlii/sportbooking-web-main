import { IconButton } from '../../../foundations';
import { Icon } from '../../atoms';
import { ModeType } from '../../../layouts';
import { Settings } from '../../../contexts';

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

export const ModeToggler = (props: Props) => {
  // ** Props
  const { settings, saveSettings } = props

  const handleModeChange = (mode: ModeType) => {
    saveSettings({ ...settings, mode: mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark' as ModeType)
    } else {
      handleModeChange('light' as ModeType)
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      <Icon icon={settings.mode === 'dark' ? "mdi:weather-sunny" : "mdi:weather-night"} />
    </IconButton>
  )
}