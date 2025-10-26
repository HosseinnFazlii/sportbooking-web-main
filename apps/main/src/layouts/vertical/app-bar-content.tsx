import { FC } from "react";
import { Box, IconButton, Icon, Settings, ModeToggler, UserDropdown, NotificationDropdown, LanguageDropdown } from '@mf-core/core-ui'
import { getNotifications } from "./notifications";

interface IAppBarContent {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}


export const VerticalAppBarContent: FC<IAppBarContent> = ({ hidden, settings, saveSettings, toggleNavVisibility }) => {
  return (
    <Box
      className='print-hide'
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box className='actions-left' sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
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
