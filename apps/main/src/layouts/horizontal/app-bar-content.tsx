import { FC } from "react";
import { Box, IconButton, Icon, Settings, ModeToggler, UserDropdown, NotificationDropdown, LanguageDropdown } from '@mf-core/core-ui'
import { getNotifications } from "./notifications";

interface IAppBarContent {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}


export const HorizontalAppBarContent: FC<IAppBarContent> = ({ hidden, settings, saveSettings, toggleNavVisibility }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="print-hide">
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/* <NotificationDropdown settings={settings} notifications={getNotifications()} /> */}
        <UserDropdown settings={settings} />
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
      </Box>
    </Box>
  )
}