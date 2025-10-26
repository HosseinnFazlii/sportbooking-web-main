import { FC } from 'react';
import { Box, useTheme } from '../../../foundations';
import { HandleSaveSettingsType, Settings, NavSxPropsType, NavContentType } from '../../../layouts';
import { FooterContent } from './FooterContent';


interface IFooter {
  settings: Settings;
  saveSettings: HandleSaveSettingsType;
  footerStyles?: NavSxPropsType;
  footerContent?: NavContentType;
}

export const Footer: FC<IFooter> = (props) => {
  const { settings, footerStyles, footerContent: userFooterContent } = props;
  const theme = useTheme();
  const { skin, footer, layout, contentWidth, version } = settings;

  if (footer === 'hidden') {
    return null
  }

  return (
    <Box
      component='footer'
      className='layout-footer print-hide'
      sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(footer === 'fixed' && {
          bottom: 0,
          position: 'sticky',
          ...(layout === 'vertical'
            ? { px: [4, 6] }
            : {
              backgroundColor: 'background.paper',
              ...(skin === 'bordered' ? { borderTop: `1px solid ${theme.palette.divider}` } : { boxShadow: 6 })
            })
        }),
        ...footerStyles
      }}
    >
      <Box
        className='footer-content-container'
        sx={{
          width: '100%',
          py: theme.spacing(footer === 'fixed' && skin === 'bordered' ? 3.875 : 4),
          ...(contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } }),
          ...(layout === 'vertical' && {
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
            ...(footer === 'fixed' && { backgroundColor: 'background.paper' })
          }),
          ...(footer === 'fixed'
            ? {
              px: [5, 6],
              ...(contentWidth === 'boxed' &&
                layout === 'vertical' && {
                '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` }
              }),
              ...(layout === 'vertical' && {
                ...(skin === 'bordered'
                  ? { border: `1px solid ${theme.palette.divider}`, borderBottomWidth: 0 }
                  : { boxShadow: 6 })
              })
            }
            : { px: [4, 6] })
        }}
      >
        {userFooterContent ? userFooterContent(props) : <FooterContent version={version} />}
      </Box>
    </Box>
  )
}